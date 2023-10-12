const blogsRouter = require('express').Router()
const Blog = require('./../models/blog.js')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title | !blog.url){
      response.status(400).end()
    }
    else{
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
    }
  })
  
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


module.exports = blogsRouter