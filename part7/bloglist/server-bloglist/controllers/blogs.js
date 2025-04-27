const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1
  })

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  response.json(blog)
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
  const { title, author, url, likes, user, comments } = request.body

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  Object.assign(blog, { title, author, url, likes, user, comments })

  const updatedBlog = await blog.save()
  const returnedBlog = await Blog.findById(updatedBlog._id).populate('user', {
    username: 1,
    name: 1
  })
  return response.json(returnedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = request.body

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  blog.comments.push(comment)

  const updatedBlog = await blog.save()
  const returnedBlog = await Blog.findById(updatedBlog._id).populate('user', {
    username: 1,
    name: 1
  })
  return response.json(returnedBlog)
})

module.exports = blogsRouter
