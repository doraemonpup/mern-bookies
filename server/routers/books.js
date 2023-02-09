import express from 'express'

import {
  getBooks,
  getBook,
  addBook,
  deleteBook,
  updateBook,
} from '../controllers/books.js'

const router = express.Router()

router.get('/', getBooks)
router.get('/:id', getBook)
router.post('/', addBook)
router.delete('/:id', deleteBook)
router.patch('/:id', updateBook)

export default router
