import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

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
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    updateBlog(updatedBlog)
  }

  const handleRemove = () => {
    const toDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (toDelete) removeBlog(blog)
  }

  if (!showDetails)
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={toggleShowDetails}>view</button>
        </div>
      </div>
    )

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleShowDetails}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>{blog.user.name}</div>
      <button style={{ backgroundColor: 'lightblue' }} onClick={handleRemove}>
        remove
      </button>
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
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
