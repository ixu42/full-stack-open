const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const data = request.body

  const creator = request.user

  const blog = new Blog({
    ...data,
    user: creator.id
  })

  const savedBlog = await blog.save()
  creator.blogs = creator.blogs.concat(savedBlog._id)
  await creator.save()

  returnedBlog = await Blog.findById(savedBlog._id).populate('user', {
    username: 1,
    name: 1
  })
  response.status(201).json(returnedBlog)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    const user = request.user
    if (blog.user.toString() !== user.id)
      return response
        .status(403)
        .json({ error: 'You do not have permission to delete this blog' })

    await Blog.findByIdAndDelete(request.params.id)

    response.status(204).end()
  }
)

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, user } = request.body

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes
  blog.user = user

  const updatedBlog = await blog.save()
  const returnedBlog = await Blog.findById(updatedBlog._id).populate('user', {
    username: 1,
    name: 1
  })
  return response.json(returnedBlog)
})

module.exports = blogsRouter
