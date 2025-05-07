import { Link } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import PropTypes from 'prop-types'

const NavBar = ({ loggedIn, setToken }) => {
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Link to="/authors">
        <button>authors</button>
      </Link>
      <Link to="/">
        <button>books</button>
      </Link>
      {loggedIn ? (
        <>
          <Link to="/add-book">
            <button>add book</button>
          </Link>
          <Link to="/recommend">
            <button>recommend</button>
          </Link>
          <button onClick={logout}>logout</button>
        </>
      ) : (
        <Link to="/login">
          <button>login</button>
        </Link>
      )}
    </div>
  )
}

NavBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setToken: PropTypes.func.isRequired
}

export default NavBar
