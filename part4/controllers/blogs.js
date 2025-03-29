const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const data = request.body

  const creator = await User.findOne()

  if (!creator) {
    return response.status(400).json({ error: 'No user found in the database' })
  }

  const blog = new Blog({
    ...data,
    user: creator.id
  })

  const savedBlog = await blog.save()
  creator.blogs = creator.blogs.concat(savedBlog._id)
  await creator.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findByIdAndDelete(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  const updatedNote = await blog.save()
  return response.json(updatedNote)
})

module.exports = blogsRouter