const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs return in correct amount and in JSON', async () => {
  response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs have id instead of _id', async () => {
  response = await api.get('/api/blogs')

  const blogs = response.body
  assert.ok(Array.isArray(blogs), 'Response should be an array')

  if (blogs.length > 0) {
    const blog = blogs[0]
    assert.ok(blog.id, 'Blog should have an id property')
    assert.ok(typeof blog.id, String, 'id property of Blog should be string')
    assert.ok(!blog._id, 'Blog should not have an _id property')
  } else {
    asssert.fail('No blogs found in the test database')
  }
})

test('a valid blog can be added', async () => {
  newBlog = {
    title: "Best practices for backend development",
    author: "Foo",
    url: "https://example.com",
    likes: 42
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  response = await api.get('/api/blogs')
  const blogs = response.body

  assert.strictEqual(blogs.length, helper.initialBlogs.length + 1, 'Blog count should increase by 1')

  assert.ok(
    // .some() checks at least one element in the array meets the condition
    blogs.some(blog => blog.title === "Best practices for backend development"),
    'Blog with correct title not found'
  )
})

test('missing likes property it defaults to value 0', async () => {
  newBlog = {
    title: "Best practices for backend development",
    author: "Foo",
    url: "https://example.com"
  }

  response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const savedBlog = response.body

  assert.strictEqual(savedBlog.likes, 0, 'Expected "likes" to default to 0')
})

test('missing itle property returns 400', async () => {
  newBlogMissingTitle = {
    author: "Foo",
    url: "https://example.com",
    likes: 42
  }

  await api
    .post('/api/blogs')
    .send(newBlogMissingTitle)
    .expect(400)
})

test('missing url property returns 400', async () => {
  newBlogMissingUrl = {
    title: "Best practices for backend development",
    author: "Foo",
    likes: 42
  }

  await api
    .post('/api/blogs')
    .send(newBlogMissingUrl)
    .expect(400)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
    
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(r => r.title)
      assert(!titles.includes(blogToDelete.title))
  })

  test('fails with status code 404 if blog does not exist', async () => {
    const nonExistingId = await helper.nonExistingId()

    await api
        .delete(`/api/blogs/${nonExistingId}`)
        .expect(404)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})
