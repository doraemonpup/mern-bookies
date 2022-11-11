const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: String,
  description: String,
  author: String,
  language: String,
  rating: Number,
  numberOfPage: Number,
  tags: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
