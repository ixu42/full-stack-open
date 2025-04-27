const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{ text: { type: String, required: true } }]
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    if (returnedObject.comments) {
      returnedObject.comments = returnedObject.comments.map((comment) => {
        return {
          id: comment._id.toString(),
          text: comment.text
        }
      })
    }
  }
})

module.exports = mongoose.model('Blog', blogSchema)
