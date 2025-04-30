import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material'
import userService from '../services/users'

const Users = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) return <div>loading data...</div>

  if (result.isError) {
    return <div>user service not available due to problems in server</div>
  }

  const users = result.data

  return (
    <Box sx={{ ml: 2 }}>
      <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Users
