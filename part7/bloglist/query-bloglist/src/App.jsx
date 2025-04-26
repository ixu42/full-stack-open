import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Users from './pages/Users'
import blogService from './services/blogs'
import { useUserValue, useUserDispatch } from './hooks/useUser'

const App = () => {
  const user = useUserValue()
  const dispatch = useUserDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({ type: 'LOGIN', payload: user })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch({ type: 'LOGOUT' })
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
    <Router>
      {/* Navigation Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
      </div>

      <Notification />

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h2>blogs</h2>
              <Togglable buttonLabel="new blog">
                <BlogForm />
              </Togglable>
              <BlogList />
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  )
}

export default App
