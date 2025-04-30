import { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@mui/material'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSetMessage, useSetError } from '../hooks/useNotification'

const BlogForm = ({ toggleVisibility }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const queryClient = useQueryClient()
  const setMessage = useSetMessage()
  const setError = useSetError()

  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setMessage(`you added '${blog.title}'`)
    },
    onError: (error) => {
      setError(error.response.data.error)
    }
  })

  const addBlog = (event) => {
    event.preventDefault()
    toggleVisibility()
    addBlogMutation.mutate(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
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
      <h2>create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="title"
            name="title"
            value={newBlog.title}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <TextField
            label="author"
            name="author"
            value={newBlog.author}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <TextField
            label="url"
            name="url"
            value={newBlog.url}
            onChange={handleBlogChange}
          />
        </div>
        <Button type="submit" variant="outlined" color="primary" size="small">
          create
        </Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  toggleVisibility: PropTypes.func
}

export default BlogForm
