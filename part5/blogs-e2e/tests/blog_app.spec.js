const { test, expect, beforeEach, describe } = require('@playwright/test')
import { loginWith, createBlog } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ request, page }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        "username": "testuser",
        "name": "testname",
        "password": "securepassword"
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'securepassword')
      await expect(page.getByText('testname logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrong')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border', '1px solid rgb(255, 0, 0)')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'securepassword')
    })
  
    test('a new blog can be created', async ({ page }) => {
      const newBlog = {
        title: 'End to end testing with Playwright',
        author: 'Matti',
        url: 'www.example.com'
      }
      await createBlog(page, newBlog)
      await expect(page.getByText(`${newBlog.title} ${newBlog.author} view`))
        .toBeVisible()
    })
  })
})