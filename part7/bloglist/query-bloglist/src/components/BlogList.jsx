import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSetMessage, useSetError } from '../hooks/useNotification'
import { useUserValue } from '../hooks/useUser'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const signedInUser = useUserValue()

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

  const queryClient = useQueryClient()
  const setMessage = useSetMessage()
  const setError = useSetError()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setMessage(`you liked '${blog.title}'`)
    },
    onError: (error) => {
      setError(error.response.data.error)
    }
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setMessage(`you removed '${blog.title}'`)
    },
    onError: (error) => {
      setError(error.response.data.error)
    }
  })

  const handleLike = () => {
    updateBlogMutation.mutate({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }

  const handleRemove = () => {
    const toDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (toDelete) removeBlogMutation.mutate(blog.id)
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
      {signedInUser.username === blog.user.username && (
        <button style={{ backgroundColor: 'lightblue' }} onClick={handleRemove}>
          remove
        </button>
      )}
    </div>
  )
}

const BlogList = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) return <div>loading data...</div>

  if (result.isError) {
    return <div>blogs service not available due to problems in server</div>
  }

  const blogs = result.data

  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
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
  }).isRequired
}

export default BlogList
