import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  const setMessage = (message, duration = 5000) => {
    dispatch({ type: 'SET', payload: { content: message, isError: false } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, duration)
  }

  const setError = (message, duration = 5000) => {
    dispatch({ type: 'SET', payload: { content: message, isError: true } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, duration)
  }

  return (
    <NotificationContext.Provider
      value={{ notification, dispatch, setMessage, setError }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
