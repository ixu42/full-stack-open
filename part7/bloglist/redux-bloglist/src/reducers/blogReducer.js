import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setMessage, setError } from './notificationReducer'

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
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObj) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObj)
      dispatch(appendBlog(newBlog))
      dispatch(
        setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      )
    } catch (exception) {
      dispatch(setError(exception.response.data.error))
    }
  }
}

export const likeBlog = (updatedBlog) => {
  return async (dispatch) => {
    try {
      await blogService.update(updatedBlog)
      dispatch(incrementLikes(updatedBlog.id))
    } catch (exception) {
      dispatch(setError(exception.response.data.error))
    }
  }
}

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogId)
      dispatch(removeBlog(blogId))
    } catch (exception) {
      dispatch(setError(exception.response.data.error))
    }
  }
}

export default blogSlice.reducer
