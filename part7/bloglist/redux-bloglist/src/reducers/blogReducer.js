import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    incrementLikes(state, action) {
      const id = action.payload
      return state.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    }
  }
})

export const { setBlogs, appendBlog, incrementLikes, removeBlog } =
  blogSlice.actions

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    console.log('blogs returned:', blogs)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObj) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObj)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (updatedBlog) => {
  return async (dispatch) => {
    await blogService.update(updatedBlog)
    dispatch(incrementLikes(updatedBlog.id))
  }
}

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.remove(blogId)
    dispatch(removeBlog(blogId))
  }
}

export default blogSlice.reducer
