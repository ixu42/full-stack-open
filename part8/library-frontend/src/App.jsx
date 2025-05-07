import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from './components/Navbar'
import Notify from './components/Notify'
import AppRoutes from './components/AppRoutes'

const App = () => {
  const [error, setError] = useState('')
  const [token, setToken] = useState(null)

  const loggedIn = Boolean(token)

  return (
    <Router>
      <NavBar loggedIn={loggedIn} setToken={setToken} />
      <Notify errorMessage={error} />
      <AppRoutes loggedIn={loggedIn} setError={setError} setToken={setToken} />
    </Router>
  )
}

export default App
