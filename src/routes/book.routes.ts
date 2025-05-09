import { Router } from 'express';
import authenticate, { checkPermission } from '../middleware/authenticate';
import {
  createBookController,
  readBookByIdController,
  readBooksByVolumeController,
  updateBookController,
  deleteBookController,
} from '../controllers/book.controller';

const router = Router();

router.post('/books', checkPermission('createBooks'), createBookController);
router.get('/books/:bookId', readBookByIdController);
router.post('/books/search', readBooksByVolumeController);
router.put('/books/:bookId', checkPermission('modifyBooks'), updateBookController);
router.delete('/books/:bookId', checkPermission('deleteBooks'), deleteBookController);

export default router;