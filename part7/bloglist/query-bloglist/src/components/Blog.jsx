import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Box, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSetMessage, useSetError } from '../hooks/useNotification'
import { useUserValue } from '../hooks/useUser'
import blogService from '../services/blogs'
import CommentList from './CommentList'

const Blog = () => {
  const queryClient = useQueryClient()
  const signedInUser = useUserValue()
  const setMessage = useSetMessage()
  const setError = useSetError()
  const navigate = useNavigate()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] })
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

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove
  })

  const handleRemove = () => {
    const toDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (toDelete) {
      removeBlogMutation.mutate(blog.id, {
        onSuccess: () => {
          queryClient.setQueryData(['blogs'], (oldList) =>
            oldList.filter((blog) => blog.id !== blog.id)
          )
          navigate('/')
          setMessage(`you removed '${blog.title}'`)
        },
        onError: (error) => {
          setError(error.response?.data?.error)
        }
      })
    }
  }

  const id = useParams().id

  const result = useQuery({
    queryKey: ['blog', id],
    queryFn: ({ queryKey }) => {
      const id = queryKey[1]
      return blogService.getById(id)
    }
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) return <div>loading data...</div>

  if (result.isError) {
    return <div>blog service not available due to problems in server</div>
  }

  const blog = result.data

  return (
    <Box sx={{ m: 2 }}>
      <h2>
        {blog.title} {blog.author}{' '}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{' '}
        <Button variant="text" size="small" onClick={handleLike}>
          like
        </Button>
      </div>
      <div>added by {blog.user.name}</div>
      {signedInUser.username === blog.user.username && (
        <Button
          variant="text"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={handleRemove}
        >
          remove
        </Button>
      )}
      <CommentList blog={blog} />
    </Box>
  )
}

export default Blog
