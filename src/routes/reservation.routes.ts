import { Router } from 'express';
import {
  createReservationController,
  readReservationByIdController,
  readReservationsController,
  updateReservationController,
  deleteReservationController,
} from '../controllers/reservation.controller';
import authenticate from '../middleware/authenticate';

const router = Router();

router.post('/reservations', authenticate, createReservationController);
router.get('/reservations/:reservationId', authenticate, readReservationByIdController);
router.post('/reservations/search', authenticate, readReservationsController);
router.put('/reservations/:reservationId', authenticate, updateReservationController);
router.delete('/reservations/:reservationId', authenticate, deleteReservationController);

export default router;