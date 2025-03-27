const { test, after, beforeEach } = require('node:test')
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

after(async () => {
  await mongoose.connection.close()
})
