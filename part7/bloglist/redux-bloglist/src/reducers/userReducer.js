import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'signedInUser',
  initialState: null,
  reducers: {
    updateUser(state, action) {
      return action.payload
    }
  }
})

export const { updateUser } = userSlice.actions

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(updateUser(user))
  }
}

export default userSlice.reducer
