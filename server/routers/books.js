import express from 'express';
import { addBook } from '../controllers/books.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('This workds');
});
router.post('/', addBook);

export default router;
