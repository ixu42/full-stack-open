import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseURL, object)
  return response.data
}

const incrementVote = async (anecdote) => {
  const response = await axios.patch(
    `${baseURL}/${anecdote.id}`,
    { votes: anecdote.votes + 1 }
  )
  return response.data
}

export default {
  getAll,
  createNew,
  incrementVote
}