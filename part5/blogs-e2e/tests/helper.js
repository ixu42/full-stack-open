const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, newBlog) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('title').fill(newBlog.title)
  await page.getByTestId('author').fill(newBlog.author)
  await page.getByTestId('url').fill(newBlog.url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${newBlog.title} ${newBlog.author}`).waitFor()
}

const createUser = async (request, username, name, password) => {
  await request.post('/api/users', {
    data: {
      "username": username,
      "name": name,
      "password": password
    }
  })
}

export { loginWith, createBlog, createUser }