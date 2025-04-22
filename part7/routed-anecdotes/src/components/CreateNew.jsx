import { useNavigate } from 'react-router-dom'
import  { useField } from '../hooks'

const CreateNew = ({ addNew, setNotification }) => {
  const [contentProps, resetContent] = useField('content')
  const [authorProps, resetAuthor] = useField('author')
  const [infoProps, resetInfo] = useField('info')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: contentProps.value,
      author: authorProps.value,
      info: infoProps.value,
      votes: 0
    })
    navigate('/')
    setNotification(`a new anecdote ${contentProps.value} created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>content <input {...contentProps} /></div>
        <div>author <input {...authorProps} /></div>
        <div>url for more info <input {...infoProps} /></div>
        <button type='submit'>create</button>
        <button type='reset' onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew