import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, removeBlog, loggedInUser }) => {
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = () => {
    try {
      dispatch(
        likeBlog({
          ...blog,
          likes: blog.likes + 1,
          user: blog.user.id
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
  }

  const handleRemove = () => {
    const toDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (toDelete) removeBlog(blog)
  }

  if (!showDetails)
    return (
      <div className="blog" style={blogStyle}>
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={toggleShowDetails}>view</button>
        </div>
      </div>
    )

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleShowDetails}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>{blog.user.name}</div>
      {loggedInUser.username === blog.user.username && (
        <button style={{ backgroundColor: 'lightblue' }} onClick={handleRemove}>
          remove
        </button>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
    user: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        username: PropTypes.string.isRequired
      })
    ])
  }).isRequired,
  removeBlog: PropTypes.func.isRequired,
  loggedInUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string,
    token: PropTypes.string.isRequired
  }).isRequired
}

export default Blog
