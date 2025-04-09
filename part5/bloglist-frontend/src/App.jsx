import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({
    content: '',
    isError: false,
  })
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const informUser = (content, isError) => {
    setMessage({
      content: content,
      isError: isError
    })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const informUserError = (exception) => {
    const errorMessage = exception.response
      ? exception.response.data.error
      : exception.message
    informUser(errorMessage, true)
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      informUser('wrong username or password', true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async newBlog => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlogs = await blogService.create(newBlog)
      informUser(`a new blog ${newBlog.title} by ${newBlog.author} added`, false)
      setBlogs(blogs.concat(returnedBlogs))
    } catch (exception) {
      informUserError(exception)
    }
  }

  const updateBlog = async (updatedBlog, userData) => {
    try {
      const returnedBlog = await blogService.update(updatedBlog, updatedBlog.id)
      const blogToBeAddedToList = {
        ...returnedBlog,
        user: userData
      }
      setBlogs(blogs.map(blog => 
        blog.id === updatedBlog.id ? blogToBeAddedToList : blog
      ))
    } catch (exception) {
      informUserError(exception)
    }
  }

  const removeBlog = async (blogToRemove) => {
    try {
      if (blogToRemove.user.username !== user.username) {
        throw new Error('You do not have permission to remove this blog.')
      }
      await blogService.remove(blogToRemove.id)
      setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
    } catch (exception) {
      informUserError(exception)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <LoginForm loginUser={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog}/>
      )}
    </div>
  )
}

export default App