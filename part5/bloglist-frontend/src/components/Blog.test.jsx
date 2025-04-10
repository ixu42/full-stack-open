import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog
  let mockUpdateBlog
  let mockRemoveBlog

  beforeEach(() => {
    blog = {
      title: 'Testing React apps',
      author: 'Foo',
      url: 'https://example.com',
      likes: 5,
      user: { id: '67f7868d38bf55b12a1cb93f', name: 'Bar', username: 'Bar' }
    }
    mockUpdateBlog = vi.fn()
    mockRemoveBlog = vi.fn()
  })

  test('renders blog title and author but not url or likes', () => {
    render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        removeBlog={mockRemoveBlog}
      />
    )

    screen.getByText('Testing React apps', { exact: false })
    screen.getByText('Foo', { exact: false })

    expect(screen.queryByText('https://example.com')).toBeNull()
    expect(screen.queryByText('likes 5')).toBeNull()
  })

  test('renders blog url and likes if clicking view button', async () => {
    render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        removeBlog={mockRemoveBlog}
      />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    screen.getByText('https://example.com')
    screen.getByText('likes 5')
  })

  test('clicking like button twice calls event handler twice', async () => {
    render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        removeBlog={mockRemoveBlog}
      />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })
})
