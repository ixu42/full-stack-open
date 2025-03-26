const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [
      { title: 'Post 1', author: 'Author 1', url: 'https://example.com/1', likes: 10 },
    ];
  
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 10)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { title: 'Post 1', author: 'Author 1', url: 'https://example.com/1', likes: 10 },
      { title: 'Post 2', author: 'Author 2', url: 'https://example.com/2', likes: 20 },
      { title: 'Post 3', author: 'Author 3', url: 'https://example.com/3', likes: 5 },
    ]
  
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 35)
  })
})