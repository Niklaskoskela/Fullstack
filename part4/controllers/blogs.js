const blogsRouter = require('express').Router()
const Blog = require('./../models/blog.js')
const User = require('./../models/user.js')

const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
  
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    //choose  user
    console.log("user",user)
    // update user of the blogpost
    body.user = user._id
    const blog = new Blog(body)

    if (!blog.title | !blog.url){
      response.status(400).end()
    }
    else{
    const savedBlog = await blog.save()

    //save blog to user
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    //respond with the saved blog
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