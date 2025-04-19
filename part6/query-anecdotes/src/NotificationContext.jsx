import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  const notify = (message, duration = 5000) => {
    dispatch({ type: 'SET', payload: message })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, duration)
  }

  return (
    <NotificationContext.Provider value={{ notification, dispatch, notify }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext