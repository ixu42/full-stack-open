import { useContext } from 'react'
import NotificationContext from './NotificationContext'

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  return context.notification
}

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)
  return context.dispatch
}

export const useSetMessage = () => {
  const context = useContext(NotificationContext)
  return context.setMessage
}

export const useSetError = () => {
  const context = useContext(NotificationContext)
  return context.setError
}
