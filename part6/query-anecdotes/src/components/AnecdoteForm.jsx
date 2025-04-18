import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdotes } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: 'SET', payload: `you added ${anecdote.content}` })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)
    },
    onError: (error) => {
      dispatch({ type: 'SET', payload: error.response.data.error })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
