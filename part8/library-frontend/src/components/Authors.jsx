import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { ALL_AUTHORS } from '../queries'
import AuthorUpdateForm from './AuthorUpdateForm'

const Authors = ({ loggedIn, setError }) => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>Loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loggedIn && <AuthorUpdateForm setError={setError} authors={authors} />}
    </div>
  )
}

Authors.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired
}

export default Authors
