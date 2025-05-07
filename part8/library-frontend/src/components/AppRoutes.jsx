import { Routes, Route, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Authors from './Authors'
import Books from './Books'
import NewBook from './NewBook'
import Recommendations from './Recommendations'
import LoginForm from './LoginForm'

const AppRoutes = ({ loggedIn, setError, setToken }) => {
  const notify = (message) => {
    setError(message)
    setTimeout(() => {
      setError('')
    }, 10000)
  }

  return (
    <Routes>
      <Route
        path="/authors"
        element={<Authors loggedIn={loggedIn} setError={notify} />}
      />
      <Route path="/" element={<Books />} />
      <Route
        path="/add-book"
        element={
          loggedIn ? <NewBook setError={notify} /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/recommend"
        element={loggedIn ? <Recommendations /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={
          loggedIn ? (
            <Navigate to="/" />
          ) : (
            <LoginForm setToken={setToken} setError={notify} />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

AppRoutes.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired
}

export default AppRoutes
