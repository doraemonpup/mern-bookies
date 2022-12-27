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
  tags: [String],
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  imageUrl: String,
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
