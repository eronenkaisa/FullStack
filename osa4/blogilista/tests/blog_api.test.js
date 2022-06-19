const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const dotenv = require('dotenv')
//const { application } = require('express')

dotenv.config()

const api = supertest(app)

test('blogs are as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('the blog indentifier is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('post request adds one blog', async () => {
  const initialBlogs = (await api.get('/api/blogs')).body

  const testBlog = {
    title: 'testBlog',
    author: 'testAuthor',
    url: '9999'
  }

  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const response = await api.get('/api/blogs')

  //const contents = response.body.map(r => r.content)

  //console.log(initialBlogs)

  expect(response.body).toHaveLength(initialBlogs.length + 1)


})

test('delete request removes one blog', async () => {
  const initialBlogs = (await api.get('/api/blogs')).body

  const testId = (await api.get('/api/blogs')).body[0].id

  const id = {
    id: testId
  }

  console.log('BODY')
  console.log(testId)
  console.log(initialBlogs.length)

  await api
    .delete('/api/blogs')
    .send(id)
    .expect(204)


  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length - 1)

})

afterAll(() => {
  mongoose.connection.close()
})