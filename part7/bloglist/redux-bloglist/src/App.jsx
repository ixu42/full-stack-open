import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.signedInUser)

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
      dispatch(setUser(user))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(setUser(null))
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
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
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

export default App
