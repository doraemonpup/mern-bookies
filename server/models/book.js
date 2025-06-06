import mongoose from 'mongoose'

const bookSchema = mongoose.Schema(
  {
    title: String,
    description: {
      type: String,
      maxLength: 1000,
    },
    author: String,
    rating: {
      type: Number,
      min: 1,
      max: 10,
    },
    pages: {
      type: Number,
      min: 1,
    },
    imageUrl: String,
  },
  { timestamps: true }
)

const Book = mongoose.model('Book', bookSchema)

export default Book
