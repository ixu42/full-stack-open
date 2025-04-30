import { Alert } from '@mui/material'
import { useNotificationValue } from '../hooks/useNotification'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification || !notification.content) return null

  const message = notification.content

  return (
    <div>
      {message && (
        <Alert severity={notification.isError ? 'error' : 'success'}>
          {message}
        </Alert>
      )}
    </div>
  )
}

export default Notification
