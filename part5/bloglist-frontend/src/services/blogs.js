import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    console.error("error during blog creation:", error)
    throw error
  }
}

const update = async (updateContent, blogId) => {
  const url = `${baseUrl}/${blogId}`

  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.put(url, updateContent, config)
    return response.data
  } catch (error) {
    console.error("error during blog update:", error)
    throw error
  }
}

export default { getAll, create, update, setToken }