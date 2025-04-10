import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('upon new blog creation event handler receives right details', async () => {
  const mockCreateBlog = vi.fn()

  render(<BlogForm createBlog={mockCreateBlog} />)

  const titleInput = screen.getByLabelText(/title/i)
  const authorInput = screen.getByLabelText(/author/i)
  const urlInput = screen.getByLabelText(/url/i)

  const user = userEvent.setup()
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'testing title input...')
  await user.type(authorInput, 'testing author input...')
  await user.type(urlInput, 'testing url input...')
  await user.click(createButton)

  expect(mockCreateBlog.mock.calls[0][0].title).toBe('testing title input...')
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('testing author input...')
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('testing url input...')
})
