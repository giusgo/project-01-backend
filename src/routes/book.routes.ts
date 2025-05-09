import { Router } from 'express';
import {
  createBookController,
  readBookByIdController,
  readBooksByVolumeController,
  updateBookController,
  deleteBookController,
} from '../controllers/book.controller';

const router = Router();

router.post('/books', createBookController);
router.get('/books/:bookId', readBookByIdController);
router.post('/books/search', readBooksByVolumeController);
router.put('/books/:bookId', updateBookController);
router.delete('/books/:bookId', deleteBookController);

export default router;