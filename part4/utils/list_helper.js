const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0)
    return null

  fav = blogs.reduce((fav, blog) => (blog.likes > fav.likes ? blog : fav), blogs[0])
  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes,
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}