import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog, deleteBlog } from './reducers/blogReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      dispatch(
        setNotification(
          { content: 'wrong username or password', isError: true },
          5
        )
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(newBlog))
      dispatch(
        setNotification(
          {
            content: `a new blog ${newBlog.title} by ${newBlog.author} added`,
            isError: false
          },
          5
        )
      )
    } catch (exception) {
      dispatch(
        setNotification(
          { content: exception.response.data.error, isError: true },
          5
        )
      )
    }
  }

  const removeBlog = (blogToRemove) => {
    try {
      if (blogToRemove.user.username !== user.username) {
        throw new Error('You do not have permission to remove this blog.')
      }
      dispatch(deleteBlog(blogToRemove.id))
    } catch (exception) {
      dispatch(
        setNotification(
          { content: exception.response.data.error, isError: true },
          5
        )
      )
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
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            removeBlog={removeBlog}
            loggedInUser={user}
          />
        ))}
    </div>
  )
}

export default App
