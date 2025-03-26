const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  fav = blogs.reduce((fav, blog) => (blog.likes > fav.likes ? blog : fav), blogs[0])
  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  // count occurrence of each author
  const authorCounts = _.countBy(blogs, 'author')

  // find author with highest count
  const topAuthor = _.maxBy(Object.keys(authorCounts), (author) => authorCounts[author])

  return { author: topAuthor, blogs: authorCounts[topAuthor] }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}