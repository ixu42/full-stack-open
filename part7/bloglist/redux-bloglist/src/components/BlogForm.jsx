import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ toggleVisibility }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    try {
      dispatch(createBlog(newBlog))
      dispatch(
        setNotification({
          content: `a new blog ${newBlog.title} by ${newBlog.author} added`,
          isError: false
        })
      )
    } catch (exception) {
      dispatch(
        setNotification({
          content: exception.response.data.error,
          isError: true
        })
      )
    }
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
    toggleVisibility()
  }

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title</label>
          <input
            data-testid="title"
            id="title"
            name="title"
            value={newBlog.title}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            data-testid="author"
            id="author"
            name="author"
            value={newBlog.author}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            data-testid="url"
            id="url"
            name="url"
            value={newBlog.url}
            onChange={handleBlogChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  toggleVisibility: PropTypes.func
}

export default BlogForm
