import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useSetError } from '../hooks/useNotification'
import { useUserDispatch } from '../hooks/useUser'
import Notification from './Notification'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const setError = useSetError()
  const dispatch = useUserDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({ type: 'LOGIN', payload: user })
    } catch (exception) {
      setError('wrong username or password')
    }

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            margin="normal"
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
