const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
  //init
  let likes = 0
  //loop over
  blogs.forEach(blog => {
      likes += blog.likes
  });
  // return likes
  return likes
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0){
    return null
  }

  let favourite = blogs[0]
  //loop over
  blogs.forEach(blog => {
      if (blog.likes > favourite.likes){
        favourite = blog
      }
  });
  // return likes
  return favourite
}

const mostBlogs = (blogs) => {
  //null check
  if (blogs.length === 0){
    return null
  }
  // grouped: Map(writer, blogs)

  const grouped = _.groupBy(blogs, blog => blog.author)
  
  var mostBlogs = null
  let mostBlogsAmount = 0

  _.forOwn(grouped, (blogs,author) => {
    if (mostBlogs === null | blogs.length > mostBlogsAmount){
      //JSON

      const blogger = {
        "author": author,
        "blogs": blogs.length
      }
      mostBlogsAmount = blogs.length
      mostBlogs = blogger
    }
  }) 

  return mostBlogs
}


const mostLikes = (blogs) => {
  //null check
  if (blogs.length === 0){
    return null
  }

  // grouped: Map(writer, blogs)
  const grouped = _.groupBy(blogs, blog => blog.author)
  //keep track
  let mostLikes = null
  let mostLikesAmount = 0

  //iterate over grouped
  _.forOwn(grouped, (blogs,author) => {
    
    let likes = 0
    //calc likes
    blogs.forEach( blog => {
      likes += blog.likes
    })
    //update if necessary
    if (mostLikes === null | likes > mostLikesAmount){
      //JSON

      const blogger = {
        "author": author,
        "likes": likes
      }
      mostLikesAmount = likes
      mostLikes = blogger
    }
  }) 

  return mostLikes
}


module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}
