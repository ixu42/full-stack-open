import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material'
import blogService from '../services/blogs'

const BlogList = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) return <div>loading data...</div>

  if (result.isError) {
    return <div>blog service not available due to problems in server</div>
  }

  const blogs = result.data

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                  <TableCell>{blog.author}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default BlogList
