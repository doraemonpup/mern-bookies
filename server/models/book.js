import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    title: String,
    description: {
      type: String,
      maxLength: 250,
    },
    author: String,
    rating: {
      type: Number,
      min: 1,
      max: 10,
    },
    numberOfPage: {
      type: Number,
      min: 1,
    },
    imageUrl: String,
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
