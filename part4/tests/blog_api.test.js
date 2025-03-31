const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let token

const testNonExistingId = async (endpoint, method) => {
  const nonExistingId = await helper.generateNonExistingId()
  await api[method](`${endpoint}/${nonExistingId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(404)
}

const testInvalidId = async (endpoint, method) => {
  const invalidId = '5a3d5da59070081a82a3445'
  await api[method](`${endpoint}/${invalidId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(400)
}

describe('when there are some blogs saved initially', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    // create a user in db if it does not exist yet
    let user = await User.findOne({ username: 'testuser2' })
    if (!user) {
      const passwordHash = await bcrypt.hash('securepw', 10)
      const testUser = new User({
        username: 'test user',
        name: 'test',
        passwordHash
      })
      await testUser.save()
    }
    user = await User.findOne({ username: 'test user' })

    // generate a jwt token for the user
    const userForToken = {
      username: user.username,
      id: user._id
    }
    token = jwt.sign(userForToken, process.env.JWT_SECRET_KEY)

    let blogObjs = helper.initialBlogs.map(blog => new Blog({ ...blog, user: user._id }))
    const promisedArray = blogObjs.map(blog => blog.save())
    await Promise.all(promisedArray)
  })

  test('blogs return in correct amount and in JSON', async () => {
    const response = await api
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
    const url = '/api/blogs'
    const newBlog = {
      title: "Best practices for backend development",
      author: "Foo",
      url: "https://example.com",
      likes: 42
    }

    const createBlog = async (blogData, expectedStatus) => {
      return await api
        .post(url)
        .set('Authorization', `Bearer ${token}`)
        .send(blogData)
        .expect(expectedStatus)
        .expect('Content-Type', /application\/json/)
    }

    test('a valid blog can be added', async () => {
      await createBlog(newBlog, 201)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(r => r.title)
      assert(titles.includes(newBlog.title))
    })

    test('missing likes property it defaults to value 0', async () => {
      const newBlog = {
        title: "Best practices for backend development",
        author: "Foo",
        url: "https://example.com"
      }

      const response = await createBlog(newBlog, 201)
      assert.strictEqual(response.body.likes, 0)
    })

    test('missing title property returns 400', async () => {
      const newBlog = {
        author: "Foo",
        url: "https://example.com",
        likes: 42
      }

      await createBlog(newBlog, 400)
    })

    test('missing url property returns 400', async () => {
      const newBlog = {
        title: "Best practices for backend development",
        author: "Foo",
        likes: 42
      }

      await createBlog(newBlog, 400)
    })

    test('missing jwt token returns 401', async () => {
      const response = await api
        .post(url)
        .send(newBlog)
        .expect(401)

      assert(response.body.error.includes('Invalid token'))
    })
  })

  describe('deletion of a blog', () => {
    const url = '/api/blogs'

    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`${url}/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
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
    const url = '/api/blogs'

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
