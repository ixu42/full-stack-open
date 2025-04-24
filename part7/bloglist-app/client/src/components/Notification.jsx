import PropTypes from 'prop-types'

const Notification = ({ message }) => {
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
