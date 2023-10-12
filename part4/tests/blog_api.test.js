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

test('Blog post id is defined with name: id', async () => {
  const response = await api.get('/api/blogs')
  
  const contents = response.body.map(r => r.id)
  expect(contents[0]).toBeDefined()

  
})

test('Blog post is added', async () => {
  const newBlog = { 
    "title": "Blog #3",
    "author": "me",
    "url": "google.com",
    "likes": "1"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
  
  const response = await api.get('/api/blogs')
  
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  
})



test('If likes are undefined, default them to 0', async () => {
  const newBlog = { 
    "title": "Blog #3",
    "author": "me",
    "url": "google.com",
  }

  blogObject = new Blog(newBlog)
  await blogObject.save()
  
  const response = await api.get('/api/blogs')
  
  expect(response.body[initialBlogs.length].likes).toBe(0)
  
})

afterAll(async () => {
  await mongoose.connection.close()
})
