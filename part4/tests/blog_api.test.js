const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  { 
    "title": "Today news",
    "author": "me",
    "url": "google.com",
    "likes": "1"
  },
  { 
    "title": "Yesterday day was cool",
    "author": "you",
    "url": "google.fi",
    "likes": "5"
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('There is n amount of blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
test('The blogs contain a specific blog', async () => {
  const response = await api.get('/api/blogs')
  
  const contents = response.body.map(r => r.title)

  expect(contents).toContain(
    "Yesterday day was cool"
  )
})

afterAll(async () => {
  await mongoose.connection.close()
})
