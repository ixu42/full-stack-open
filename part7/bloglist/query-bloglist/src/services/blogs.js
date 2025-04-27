import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}`)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (blog) => {
  const url = `${baseUrl}/${blog.id}`

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(url, blog, config)
  return response.data
}

const remove = async (blogId) => {
  const url = `${baseUrl}/${blogId}`

  const config = {
    headers: { Authorization: token }
  }

  await axios.delete(url, config)
}

const addComment = async ({ blogId, comment }) => {
  const url = `${baseUrl}/${blogId}/comments`

  const response = await axios.post(url, { text: comment })
  return response.data
}

export default { getAll, getById, create, update, remove, addComment, setToken }
