const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const testNonExistingId = async (endpoint, method) => {
  const nonExistingId = await helper.generateNonExistingId()
  await api[method](`${endpoint}/${nonExistingId}`).expect(404)
}

const testInvalidId = async (endpoint, method) => {
  const invalidId = '5a3d5da59070081a82a3445'
  await api[method](`${endpoint}/${invalidId}`).expect(400)
}

describe('when there are some blogs saved initially', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjs = helper.initialBlogs.map(blog => new Blog(blog))
    const promisedArray = blogObjs.map(blog => blog.save())
    await Promise.all(promisedArray)
  })

  test('blogs return in correct amount and in JSON', async () => {
    response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blogs have id instead of _id', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[0]

    assert(blog.id)
    assert.strictEqual(typeof blog.id, 'string')
    assert.strictEqual(blog._id, undefined)
  })

  describe('addition of a blog', () => {
    const blogToAdd = {
      title: "Best practices for backend development",
      author: "Foo",
      url: "https://example.com",
      likes: 42
    }

    test('a valid blog can be added', async () => {
      newBlog = blogToAdd
      url = '/api/blogs'

      await api
        .post(url)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      titles = blogsAtEnd.map(r => r.title)
      assert(titles.includes(newBlog.title))
    })

    test('missing likes property it defaults to value 0', async () => {
      newBlog = blogToAdd
      delete newBlog.likes

      response = await api
        .post(url)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const savedBlog = response.body

      assert.strictEqual(savedBlog.likes, 0)
    })

    test('missing title property returns 400', async () => {
      newBlog = blogToAdd
      delete newBlog.title

      await api
        .post(url)
        .send(newBlog)
        .expect(400)
    })

    test('missing url property returns 400', async () => {
      newBlog = blogToAdd
      delete newBlog.url

      await api
        .post(url)
        .send(newBlog)
        .expect(400)
    })
  })

  describe('deletion of a blog', () => {
    url = '/api/blogs'

    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
          .delete(`${url}/${blogToDelete.id}`)
          .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(r => r.title)
        assert(!titles.includes(blogToDelete.title))
    })

    test('fails with status code 404 if blog does not exist', async () => {
      await testNonExistingId(url, 'delete')
    })

    test('fails with status code 400 if id is invalid', async () => {
      await testInvalidId(url, 'delete')
    })
  })

  describe('updating a blog', () => {
    url = '/api/blogs'

    test('succeeds with valid data', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const newData = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 10
      }

      await api
        .put(`${url}/${blogToUpdate.id}`)
        .send(newData)
        .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd[0].likes, 10)
    })

    test('fails with status code 404 if blog does not exist', async () => {
      await testNonExistingId(url, 'put')
    })

    test('fails with status code 400 if id is invalid', async () => {
      await testInvalidId(url, 'put')
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
