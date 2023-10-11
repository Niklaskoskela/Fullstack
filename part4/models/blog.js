const mongoose = require('mongoose')
const logger = require('./../utils/logger')
const config = require('./../utils/config')
require('dotenv').config();



const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})



const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl).then( () =>
    logger.info("connected to MONGODB")
)

module.exports = mongoose.model('Blog', blogSchema)