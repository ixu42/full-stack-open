import { useState } from 'react'

const Blog = ({ blog }) => {
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
        likes {blog.likes} <button>like</button>
      </div>
      <div>{blog.user.name}</div>
    </div>
  )
}

export default Blog