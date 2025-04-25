import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)

  if (!message || !message.content) return null

  return (
    <div className={message.isError ? 'error' : 'success'}>
      {message.content}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired
  })
}

export default Notification
