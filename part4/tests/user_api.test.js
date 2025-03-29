const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('securepw', 10)
    const user = new User({
      username: 'initial user',
      passwordHash
    })
    await user.save()
  })

  test('test getting all users', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, 1)
    assert.strictEqual(response.body[0].username, 'initial user')
  })

  describe('test user creation', () => {
    const url = '/api/users'

    test('succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'test user',
        name: 'test',
        password: 'securepassword123'
      }

      await api
        .post(url)
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('fails with status code 400 if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

        const newUser = {
          username: 'initial user',
          name: 'initial',
          password: 'securepassword123'
        }

        const response = await api
          .post(url)
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        assert(response.body.error.includes('expected `username` to be unique'))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})