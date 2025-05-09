import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'

import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = ({ setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      const message = error.graphQLErrors.map((e) => e.message).join('\n')
      setError(message)
    },
    update: (cache, response) => {
      const newBook = response.data.addBook
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        const bookExists = allBooks.some((b) => b.id === newBook.id)
        if (bookExists) return { allBooks }
        return {
          allBooks: allBooks.concat(response.data.addBook)
        }
      })
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        const author = newBook.author
        const authorExists = allAuthors.some((a) => a.name === author.name)
        if (authorExists) return { allAuthors }
        return {
          allAuthors: allAuthors.concat(author)
        }
      })
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    if (!title.trim() || !author.trim() || !published.trim()) {
      setError('Title, author, and published year are required.')
      return
    }

    const publishedYear = Number(published)
    const currentYear = new Date().getFullYear()

    if (
      !Number.isInteger(publishedYear) ||
      publishedYear <= 0 ||
      publishedYear > currentYear
    ) {
      setError(
        `Year must be a positive whole number not greater than ${currentYear}.`
      )
      return
    }

    const cleanedGenres = genres.filter((g) => g.trim() !== '')

    await createBook({
      variables: {
        title,
        author,
        published: publishedYear,
        genres: cleanedGenres
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

NewBook.propTypes = {
  setError: PropTypes.func.isRequired
}

export default NewBook
