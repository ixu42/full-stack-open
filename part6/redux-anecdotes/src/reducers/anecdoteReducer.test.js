import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  test('votes added by 1 with action VOTE', () => {
    const state = [
      {
        content: 'the app state is in redux store',
        id: 1,
        votes: 0
      }
    ]
    const action = {
      type: 'anecdotes/voteAnecdote',
      payload: state[0].id
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual({
        content: 'the app state is in redux store',
        id: 1,
        votes: 1
      })
  })

  test('returns new state with action NEW_ANECDOTE', () => {
    const state = []
    const action = {
      type: 'anecdotes/createAnecdote',
      payload: 'the app state is in redux store'
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState.map(s => s.content)).toContainEqual(action.payload)
  })
})
