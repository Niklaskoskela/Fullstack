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

module.exports = {
  dummy, totalLikes, favouriteBlog
}
