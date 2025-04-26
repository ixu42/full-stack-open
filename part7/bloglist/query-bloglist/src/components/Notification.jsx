import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification || !notification.content) return null

  return (
    <div className={notification.isError ? 'error' : 'success'}>
      {notification.content}
    </div>
  )
}

export default Notification
