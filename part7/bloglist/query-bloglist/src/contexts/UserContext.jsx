import { createContext, useReducer, useContext } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {props.children}
    </UserContext.Provider>
  )
}

// custom hooks
export const useUserValue = () => {
  const context = useContext(UserContext)
  return context.user
}

export const useUserDispatch = () => {
  const context = useContext(UserContext)
  return context.dispatch
}

export default UserContext
