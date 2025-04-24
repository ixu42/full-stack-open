require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = {
  development: process.env.MONGODB_URI_DEV,
  test: process.env.MONGODB_URI_TEST,
  production: process.env.MONGODB_URI_PROD
}[process.env.NODE_ENV || 'development']

module.exports = {
  PORT,
  MONGODB_URI
}
