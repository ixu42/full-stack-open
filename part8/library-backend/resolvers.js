const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) {
          return []
        }
        filter.author = author._id
      }

      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }

      return Book.find(filter).populate('author')
    },
    allAuthors: async () => {
      // aggregate book counts per author
      const bookCounts = await Book.aggregate([
        {
          $group: {
            _id: '$author',
            count: { $sum: 1 }
          }
        }
      ])

      // convert the aggregation result into a map for fast lookup
      const countMap = {}
      bookCounts.forEach(({ _id, count }) => {
        countMap[_id.toString()] = count
      })

      // fetch all authors and attach bookCount
      const authors = await Author.find({})

      return authors.map((author) => ({
        name: author.name,
        born: author.born,
        id: author._id.toString(),
        bookCount: countMap[author._id.toString()] || 0
      }))
    },
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const existingBook = await Book.findOne({ title: args.title })
      if (existingBook) {
        throw new GraphQLError('Book title must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title
          }
        })
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          if (error.name === 'ValidationError') {
            throw new GraphQLError(`Invalid author input: ${error.message}`, {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error
              }
            })
          }
          throw error
        }
      }

      let newBook = new Book({ ...args, author: author._id })

      try {
        await newBook.save()
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new GraphQLError(`Invalid book input: ${error.message}`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error
            }
          })
        }
        throw error
      }

      newBook = newBook.populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) return null

      author.born = args.setBornTo
      await author.save()
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed.', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers
