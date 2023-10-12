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

test('Blog without title responds with 400', async () => {
  const newBlog = { 
    "author": "me",
    "url": "google.com",
  }
  
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
  
})

test('Blog without url responds with 400', async () => {
  const newBlog = { 
    "author": "me",
    "title": "google.com",
  }
  
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
  
})

test('Deleting a blog removes a blog', async () => {
  const response = await api.get('/api/blogs')
  const blogID = response.body[0].id
  console.log("blogid", blogID)
  
  await api
  .delete('/api/blogs/'+blogID)
  .expect(204)

  const responseLess = await api.get('/api/blogs')

  expect(responseLess.body.length).toBe(initialBlogs.length-1)
})

test('Blog updates likes', async () => {
  const idresponse = await api.get('/api/blogs')
  expect(idresponse.body[0].likes).toBe(1)

  const blogUpdated = idresponse.body[0]
  blogUpdated.likes += 1
  
  await api
  .put('/api/blogs/'+blogUpdated.id)
  .send(blogUpdated)

  const response = await api.get('/api/blogs')
  //initial likes = 2
  expect(response.body[0].likes).toBe(2)
})

afterAll(async () => {
  await mongoose.connection.close()
})
