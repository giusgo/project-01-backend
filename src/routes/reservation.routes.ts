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

router.post('/reservations', authenticate, createReservationController); // Protected
router.get('/reservations/:reservationId', authenticate, readReservationByIdController); // Protected
router.post('/reservations/search', authenticate, readReservationsController); // Protected
router.put('/reservations/:reservationId', authenticate, updateReservationController); // Protected
router.delete('/reservations/:reservationId', authenticate, deleteReservationController); // Protected

export default router;