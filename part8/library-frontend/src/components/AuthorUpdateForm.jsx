import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const AuthorUpdateForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const message = error.graphQLErrors.map((e) => e.message).join('\n')
      setError(message)
    }
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('Author not found')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    const cleanedName = name.trim()
    let cleanedYear = birthYear.trim()

    if (!cleanedName || !cleanedYear) {
      setError("Author's name and birth year are required.")
      return
    }

    cleanedYear = Number(cleanedYear)
    const currentYear = new Date().getFullYear()

    if (
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
      variables: { name: cleanedName, setBornTo: cleanedYear }
    })

    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h3>set birth year</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
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
  setError: PropTypes.func.isRequired
}

export default AuthorUpdateForm
