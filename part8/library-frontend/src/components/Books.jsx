import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FIND_BOOKS_BY_GENRE } from '../queries'

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const selectedBooksResult = useQuery(FIND_BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre },
    fetchPolicy: 'network-only'
  })
  const allBooksResult = useQuery(ALL_BOOKS)

  if (selectedBooksResult.loading || allBooksResult.loading) {
    return <div>Loading...</div>
  }

  const selectedBooks = selectedBooksResult.data.allBooks
  const allBooks = allBooksResult.data.allBooks

  const genres = Array.from(new Set(allBooks.flatMap((b) => b.genres)))

  return (
    <div>
      <h2>books</h2>

      {/* table of books */}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {selectedBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* buttons to select a specific genre */}
      {genres.map((genre) => (
        <button key={genre} onClick={() => setSelectedGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setSelectedGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
