import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
  title: String,
  description: String,
  author: String,
  rating: {
    type: Number,
    min: 1,
  },
  numberOfPage: {
    type: Number,
    min: 1,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
  imageUrl: String,
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
