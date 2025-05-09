import { Router } from 'express';
import {
  createUserController,
  readUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/user.controller';
import authenticate, { checkPermission, checkSelfOrPermission } from '../middleware/authenticate';

const router = Router();

router.post('/users', createUserController); // Public
router.post('/users/login', readUserController); // Public
router.put('/users/:userId', checkSelfOrPermission('modifyUsers'), updateUserController); // Protected but allows self-update
router.delete('/users/:userId', checkSelfOrPermission('deleteUsers'), deleteUserController); // Protected but allows self-delete

export default router;