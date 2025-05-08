import { useQuery } from '@apollo/client'
import { FIND_BOOKS_BY_GENRE, ME } from '../queries'

const Recommendations = () => {
  const res1 = useQuery(ME)
  const favGenre = res1.data?.me.favoriteGenre

  const res2 = useQuery(FIND_BOOKS_BY_GENRE, {
    variables: { genre: favGenre },
    skip: !favGenre,
    fetchPolicy: 'network-only'
  })

  if (res1.loading || res2.loading) {
    return <div>Loading...</div>
  }

  const books = res2.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <strong>{favGenre}</strong>
      </div>

      {/* table of books */}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
