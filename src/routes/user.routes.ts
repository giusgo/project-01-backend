import { Router } from 'express';
import {
  createUserController,
  readUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/user.controller';
import authenticate, { checkPermission } from '../middleware/authenticate';

const router = Router();

router.post('/users', createUserController);
router.post('/users/login', readUserController);
router.put('/users/:userId', checkPermission('modifyUsers'), updateUserController);
router.delete('/users/:userId', checkPermission('deleteUsers'), deleteUserController);

export default router;