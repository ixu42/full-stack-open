import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography
} from '@mui/material'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
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
    return <LoginForm />
  }

  return (
    <Container>
      <Router>
        {/* Navigation Bar */}
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
            <Box sx={{ flexGrow: 1 }} /> {/* pushes logout to the right */}
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body1">{user.name} logged in</Typography>
              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Notification />

        <Routes>
          <Route path="blogs/:id" element={<Blog />} />
          <Route path="users/:id" element={<User />} />
          <Route path="/users" element={<Users />} />
          <Route
            path="/"
            element={
              <Box sx={{ ml: 2 }}>
                <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
                  Blogs
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Togglable buttonLabel="new blog">
                    <BlogForm />
                  </Togglable>
                </Box>
                <BlogList />
              </Box>
            }
          />
        </Routes>
      </Router>
    </Container>
  )
}

export default App
