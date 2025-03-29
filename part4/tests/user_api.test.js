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
      name: 'initial',
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

    const createUser = async (userData, expectedStatus) => {
      return await api
        .post(url)
        .send(userData)
        .expect(expectedStatus)
        .expect('Content-Type', /application\/json/)
    }

    test('succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'test user',
        name: 'test',
        password: 'securepassword123'
      }

      await createUser(newUser, 201)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('fails with status code 400 if username already taken', async () => {
      const newUser = {
        username: 'initial user',
        name: 'initial',
        password: 'securepassword123'
      }

      const response = await createUser(newUser, 400)

      assert(response.body.error.includes('expected `username` to be unique'))
    })

    test('fails with status code 400 if missing username', async () => {
      const newUser = {
        name: 'test',
        password: 'securepassword123'
      }

      const response = await createUser(newUser, 400)

      assert(response.body.error.includes('username and password are required'))
    })

    test('fails with status code 400 if missing password', async () => {
      const newUser = {
        username: 'test user',
        name: 'test'
      }

      const response = await createUser(newUser, 400)

      assert(response.body.error.includes('username and password are required'))
    })

    test('fails with status code 400 if username contains less than 3 chars', async () => {
      const newUser = {
        username: 'aa',
        name: 'test',
        password: 'securepassword123'
      }

      const response = await createUser(newUser, 400)

      assert(response.body.error.includes('username and password must be at least 3 characters long'))
    })

    test('fails with status code 400 if password contains less than 3 chars', async () => {
      const newUser = {
        username: 'test user',
        name: 'test',
        password: 'aa'
      }

      const response = await createUser(newUser, 400)

      assert(response.body.error.includes('username and password must be at least 3 characters long'))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})