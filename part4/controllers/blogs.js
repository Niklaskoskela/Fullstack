const blogsRouter = require('express').Router()
const Blog = require('./../models/blog.js')
const User = require('./../models/user.js')



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
   
  
    const blog = new Blog(body)

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

blogsRouter.put('/:id', (request, response, next) => {
  const blog = new Blog(request.body)


  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter