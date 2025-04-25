import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const { updateNotification, clearNotification } =
  notificationSlice.actions

export const setNotification = (msg, time) => {
  return (dispatch) => {
    dispatch(updateNotification(msg))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
