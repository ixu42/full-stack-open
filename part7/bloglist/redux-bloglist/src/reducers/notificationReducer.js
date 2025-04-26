import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(_, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})

export const { updateNotification, clearNotification } =
  notificationSlice.actions

export const setMessage = (messageStr) => {
  return (dispatch) => {
    dispatch(
      updateNotification({
        content: messageStr,
        isError: false
      })
    )
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const setError = (messageStr) => {
  return (dispatch) => {
    dispatch(
      updateNotification({
        content: messageStr,
        isError: true
      })
    )
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer
