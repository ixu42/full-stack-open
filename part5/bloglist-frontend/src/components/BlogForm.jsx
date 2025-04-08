const BlogForm = ({
  addBlog,
  handleBlogChange,
  newBlog
}) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        author
        <input
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        url
        <input
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

export default BlogForm