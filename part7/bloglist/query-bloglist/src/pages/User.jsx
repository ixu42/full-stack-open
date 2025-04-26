import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const User = () => {
  const id = useParams().id

  const result = useQuery({
    queryKey: ['user', id],
    queryFn: ({ queryKey }) => {
      const [_key, id] = queryKey
      return userService.getById(id)
    }
  })

  if (result.isLoading) return <div>loading data...</div>

  if (result.isError) {
    return <div>users service not available due to problems in server</div>
  }

  const user = result.data

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
