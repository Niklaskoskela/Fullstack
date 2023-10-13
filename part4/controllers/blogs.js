const blogsRouter = require('express').Router()
const Blog = require('./../models/blog.js')
const User = require('./../models/user.js')



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
  
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    //choose first user
    const users = await User.find({})
    console.log("user",users[0])
    
    body.user = users[0]._id
    const blog = new Blog(body)

    if (!blog.title | !blog.url){
      response.status(400).end()
    }
    else{
    const savedBlog = await blog.save()
    
    users[0].blogs = users[0].blogs.concat(savedBlog._id)
    await users[0].save()


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