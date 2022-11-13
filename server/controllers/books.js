import express from 'express';
import mongoose from 'mongoose';
import Book from '../models/book.js';

const router = express.Router();

const addBook = async (req, res) => {
  console.log(req.body);
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

export { addBook };
export default router;
