import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title and author but not url or likes', () => {
  const blog = {
    "title": "Testing React apps",
    "author": "Foo",
    "url": "https://example.com",
    "likes": 5
  }

  const mockUpdateBlog = vi.fn()
  const mockRemoveBlog = vi.fn()

  render(<Blog blog={blog} updateBlog={mockUpdateBlog} removeBlog={mockRemoveBlog} />)

  screen.getByText('Testing React apps', { exact: false })
  screen.getByText('Foo', { exact: false })
  const elemUrl = screen.queryByText('https://example.com')
  const elemLikes = screen.queryByText('likes 5')
  expect(elemUrl).toBeNull()
  expect(elemLikes).toBeNull()
})


test('renders blog url and likes if clicking view button', async () => {
  const blog = {
    "title": "Testing React apps",
    "author": "Foo",
    "url": "https://example.com",
    "likes": 5,
    user: {
      name: "Bar"
    }
  }

  const mockUpdateBlog = vi.fn()
  const mockRemoveBlog = vi.fn()

  render(<Blog blog={blog} updateBlog={mockUpdateBlog} removeBlog={mockRemoveBlog} />)
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  screen.getByText('https://example.com')
  screen.getByText('likes 5')
})

test('clicking like button twice calls event handler twice', async () => {
  const blog = {
    "title": "Testing React apps",
    "author": "Foo",
    "url": "https://example.com",
    "likes": 0,
    user: {
      name: "Bar"
    }
  }

  const mockUpdateBlog = vi.fn()
  const mockRemoveBlog = vi.fn()

  render(<Blog blog={blog} updateBlog={mockUpdateBlog} removeBlog={mockRemoveBlog} />)
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockUpdateBlog.mock.calls).toHaveLength(2)
})