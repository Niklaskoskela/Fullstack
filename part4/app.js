const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')


const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

app.use(cors())
app.use(express.json())

const PORT = config.PORT

module.exports = app