import { useNotificationValue } from '../hooks/useNotification'

const notificationStyle = {
  base: {
    background: '#dfdfdfde',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid'
  },
  success: {
    color: 'green',
    borderColor: 'green'
  },
  error: {
    color: 'red',
    borderColor: 'red'
  }
}

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification || !notification.content) return null

  const style = {
    ...notificationStyle.base,
    ...(notification.isError
      ? notificationStyle.error
      : notificationStyle.success)
  }

  return <div style={style}>{notification.content}</div>
}

export default Notification
