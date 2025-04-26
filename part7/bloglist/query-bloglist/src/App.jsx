import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useSetMessage, useSetError } from './useNotification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const setMessage = useSetMessage()
  const setError = useSetError()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setError('wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const addedBlog = await blogService.create(newBlog)
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setBlogs(blogs.concat(addedBlog))
    } catch (exception) {
      setError(exception.response.data.error)
    }
  }

  const updateBlog = async (updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(updatedBlog, updatedBlog.id)
      setBlogs(
        blogs.map((blog) => (blog.id === returnedBlog.id ? returnedBlog : blog))
      )
    } catch (exception) {
      setError(exception.response.data.error)
    }
  }

  const removeBlog = async (blogToRemove) => {
    try {
      if (blogToRemove.user.username !== user.username) {
        throw new Error('You do not have permission to remove this blog.')
      }
      await blogService.remove(blogToRemove.id)
      setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id))
    } catch (exception) {
      setError(exception.response.data.error)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm loginUser={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            loggedInUser={user}
          />
        ))}
    </div>
  )
}

export default App
