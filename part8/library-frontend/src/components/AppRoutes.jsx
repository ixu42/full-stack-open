import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'
import PropTypes from 'prop-types'
import Authors from './Authors'
import Books from './Books'
import NewBook from './NewBook'
import Recommendations from './Recommendations'
import LoginForm from './LoginForm'
import { FIND_BOOKS_BY_GENRE, BOOK_ADDED } from '../queries'
import updateCache from '../updateCache'

const AppRoutes = ({ loggedIn, setError, setToken }) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCache(
        client.cache,
        { query: FIND_BOOKS_BY_GENRE, variables: { genre: selectedGenre } },
        'allBooks',
        addedBook
      )
    }
  })

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
      <Route
        path="/"
        element={
          <Books
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        }
      />
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
