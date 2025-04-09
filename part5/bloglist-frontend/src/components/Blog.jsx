import { useState } from 'react'

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
    updateBlog(updatedBlog, blog.user)
  }

  const handleRemove = () => {
    const toDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (toDelete) removeBlog(blog)
  }

  if (!showDetails) return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleShowDetails}>view</button>
      </div>
    </div>
  )

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleShowDetails}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>{blog.user.name}</div>
      <button
        style={{ backgroundColor: 'lightblue' }}
        onClick={handleRemove}>
        remove
      </button>
    </div>
  )
}

export default Blog