import { Router } from 'express';
import authenticate from '../middleware/authenticate';
import {
  createBookController,
  readBookByIdController,
  readBooksByVolumeController,
  updateBookController,
  deleteBookController,
} from '../controllers/book.controller';

const router = Router();

router.post('/books', authenticate, createBookController); // Protected
router.get('/books/:bookId', readBookByIdController); // Public
router.post('/books/search', readBooksByVolumeController); // Public
router.put('/books/:bookId', authenticate, updateBookController); // Protected
router.delete('/books/:bookId', authenticate, deleteBookController); // Protected

export default router;