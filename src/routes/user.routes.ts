import { Router } from 'express';
import {
  createUserController,
  readUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/user.controller';
import authenticate from '../middleware/authenticate';

const router = Router();

router.post('/users', createUserController); // Public
router.post('/users/login', readUserController); // Public
router.put('/users/:userId', authenticate, updateUserController); // Protected
router.delete('/users/:userId', authenticate, deleteUserController); // Protected

export default router;