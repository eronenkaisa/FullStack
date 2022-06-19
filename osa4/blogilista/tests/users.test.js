const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const dotenv = require('dotenv')

dotenv.config()

const api = supertest(app)

describe('username', () => {

  test('username is required', async () => {
    const testUser = {
      username: '',
      name: 'testUser',
      password: 'salasana'
    }

    await api
      .post('/api/users')
      .send(testUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ 'error':'username is either missing or too short' })
  })


  test('username minlegth is 3', async () => {
    const testUser = {
      username: 'u',
      name: 'testUser',
      password: 'salasana'
    }

    await api
      .post('/api/users')
      .send(testUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ 'error':'username is either missing or too short' })
  })

})



describe('password', () => {

  test('password is required', async () => {
    const testUser = {
      username: 'user',
      name: 'testUser',
      password: ''
    }

    await api
      .post('/api/users')
      .send(testUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ 'error':'password is either missing or too short' })
  })


  test('password minlegth is 3', async () => {
    const testUser = {
      username: 'user',
      name: 'testUser',
      password: 's'
    }

    await api
      .post('/api/users')
      .send(testUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ 'error':'password is either missing or too short' })
  })
})


afterAll(() => {
  mongoose.connection.close()
})