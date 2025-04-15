import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(states => states)

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes