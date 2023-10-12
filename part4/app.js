// node modules
const http = require('http')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

// own modules 
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const blogsRouter = require('./controllers/blogs')

//PRE app
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

//AFTER app
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app