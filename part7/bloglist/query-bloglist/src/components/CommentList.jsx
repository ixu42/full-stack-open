import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useSetError } from '../hooks/useNotification'

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()
  const setError = useSetError()

  const addCommentMutation = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] })
    },
    onError: (error) => {
      setError(error.response.data.error)
    }
  })

  const addComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    addCommentMutation.mutate({ blogId, comment })
    setComment('')
  }

  return (
    <form onSubmit={addComment}>
      <input value={comment} onChange={(e) => setComment(e.target.value)} />
      <button type="submit">add comment</button>
    </form>
  )
}

CommentForm.propTypes = {
  blogId: PropTypes.string.isRequired
}

const CommentList = ({ blog }) => {
  return (
    <div>
      <h3>comments</h3>
      <CommentForm blogId={blog.id} />
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  )
}

CommentList.propTypes = {
  blog: PropTypes.object.isRequired
}

export default CommentList
