import { render, screen } from '@testing-library/react'
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
