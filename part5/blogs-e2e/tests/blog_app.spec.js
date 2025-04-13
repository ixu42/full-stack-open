const { test, expect, beforeEach, describe } = require('@playwright/test')
import { loginWith, createBlog, createUser } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ request, page }) => {
    await request.post('/api/testing/reset')
    await createUser(request, "testuser", "test", "secret")
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
      await loginWith(page, 'testuser', 'secret')
      await expect(page.getByText('test logged in')).toBeVisible()
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
      await loginWith(page, 'testuser', 'secret')
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

    describe('several blogs exist', () => {
      let blog1 = {
        title: 'first blog',
        author: 'foo',
        url: 'www.example1.com'
      }

      let blog2 = {
        title: 'second blog',
        author: 'bar',
        url: 'www.example2.com'
      }

      let blog3 = {
        title: 'third blog',
        author: 'baz',
        url: 'www.example3.com'
      }

      beforeEach(async ({ page }) => {
        await createBlog(page, blog1)
        await createBlog(page, blog2)
        await createBlog(page, blog3)
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByText(blog1.title)
          .getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test(
        'a blog can be deleted by the user who added it',
        async ({ page }) => {
          page.on('dialog', dialog => dialog.accept())
          await page.getByText(blog1.title)
            .getByRole('button', { name: 'view' }).click()
          await page.getByRole('button', { name: 'remove' }).click()
          await expect(page.getByText(blog1.title)).toHaveCount(0)
        }
      )

      test(
        'only the user who added the blog sees the blog\'s delete button',
        async ({ request, page }) => {
          await page.getByText('logout').click()
          await createUser(request, "otheruser", "other", "secret")
          await loginWith(page, 'otheruser', 'secret')
          await page.getByText(blog1.title)
            .getByRole('button', { name: 'view' }).click()
          await expect(page.getByRole('button', { name: 'remove' }))
            .not.toBeVisible()
        }
      )

      test('blogs are arranged according to likes', async ({ page }) => {
        const blog1Elem = page.locator('.blog')
          .filter({ hasText: `${blog1.title} ${blog1.author}` })
        const blog2Elem = page.locator('.blog')
          .filter({ hasText: `${blog2.title} ${blog2.author}` })
        const blog3Elem = page.locator('.blog')
          .filter({ hasText: `${blog3.title} ${blog3.author}` })

        // only view blog1
        await blog1Elem.getByRole('button', { name: 'view' }).click()

        // view and like blog2 twice
        await blog2Elem.getByRole('button', { name: 'view' }).click()
        await blog2Elem.getByRole('button', { name: 'like' }).click()
        await blog2Elem.getByText('likes 1').waitFor()
        await blog2Elem.getByRole('button', { name: 'like' }).click()

        // view and like blog3 once
        await blog3Elem.getByRole('button', { name: 'view' }).click()
        await blog3Elem.getByRole('button', { name: 'like' }).click()

        // wait until the likes of each blog are updated on screen
        await blog1Elem.getByText('likes 0').waitFor()
        await blog2Elem.getByText('likes 2').waitFor()
        await blog3Elem.getByText('likes 1').waitFor()

        const blogElems = await page.locator('.blog').allTextContents()
        expect(blogElems[0]).toContain(blog2.title)
        expect(blogElems[1]).toContain(blog3.title)
        expect(blogElems[2]).toContain(blog1.title)
      })
    })
  })
})