import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const AuthorUpdateForm = ({ setError, authors }) => {
  const [birthYear, setBirthYear] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(null)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const message = error.graphQLErrors.map((e) => e.message).join('\n')
      setError(message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    if (!selectedAuthor) {
      setError('Please selete an author.')
      return
    }

    let cleanedYear = birthYear.trim()
    cleanedYear = Number(cleanedYear)
    const currentYear = new Date().getFullYear()

    if (
      !cleanedYear ||
      !Number.isInteger(cleanedYear) ||
      cleanedYear <= 0 ||
      cleanedYear > currentYear
    ) {
      setError(
        `Year must be a positive whole number not greater than ${currentYear}.`
      )
      return
    }

    await editAuthor({
      variables: { name: selectedAuthor.value, setBornTo: cleanedYear }
    })

    setSelectedAuthor(null)
    setBirthYear('')
  }

  const options = authors.map((a) => ({
    value: a.name,
    label: a.name
  }))

  return (
    <div>
      <h3>set birth year</h3>
      <form onSubmit={submit}>
        <div>
          <Select
            options={options}
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            placeholder="Select author..."
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

AuthorUpdateForm.propTypes = {
  setError: PropTypes.func.isRequired,
  authors: PropTypes.array.isRequired
}

export default AuthorUpdateForm
