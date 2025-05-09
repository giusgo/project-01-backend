import { Router } from 'express';
import {
  createUserController,
  readUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/user.controller';

const router = Router();

router.post('/users', createUserController);
router.post('/users/login', readUserController);
router.put('/users/:userId', updateUserController);
router.delete('/users/:userId', deleteUserController);

export default router;