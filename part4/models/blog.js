const mongoose = require('mongoose')
require('dotenv').config();


const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})



const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl).then( () =>
    console.log("connected to MONGODB")
)

module.exports = mongoose.model('Blog', blogSchema)