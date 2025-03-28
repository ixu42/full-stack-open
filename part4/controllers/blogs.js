const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
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