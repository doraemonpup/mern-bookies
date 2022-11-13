import express from 'express';
import mongoose from 'mongoose';
import Book from '../models/book.js';

const router = express.Router();

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addBook = async (req, res) => {
  const books = await Book.find();
  if (books.some(book => book.title === req.body.title)) {
    res.status(409).json({ message: 'Item already existed' });
    return;
  }

  const { title, description, author, rating, numberOfPage, tags } = req.body;
  const newBook = new Book({
    title,
    description,
    author,
    rating,
    numberOfPage,
    tags,
  });

  try {
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export { getBooks, addBook };
export default router;
