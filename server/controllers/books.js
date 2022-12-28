import express from 'express';
import mongoose from 'mongoose';
import Book from '../models/book.js';

const router = express.Router();

// get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// add a new book
const addBook = async (req, res) => {
  const books = await Book.find();
  if (books.some(book => book.title === req.body.title)) {
    res.status(409).json({ message: 'Item already existed' });
    return;
  }

  const { title, description, author, rating, pages, imageUrl } = req.body;
  const newBook = new Book({
    title,
    description,
    author,
    rating,
    pages,
    imageUrl,
  });

  try {
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`Book with id: ${id} doesn't exist`);

  await Book.findByIdAndDelete(id);
  res.status(200).json({ message: 'Book deleted successfully' });
};

export { getBooks, addBook, deleteBook };
export default router;
