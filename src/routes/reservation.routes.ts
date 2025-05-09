import { Router } from 'express';
import {
  createReservationController,
  readReservationByIdController,
  readReservationsController,
  updateReservationController,
  deleteReservationController,
} from '../controllers/reservation.controller';

const router = Router();

router.post('/reservations', createReservationController);
router.get('/reservations/:reservationId', readReservationByIdController);
router.post('/reservations/search', readReservationsController);
router.put('/reservations/:reservationId', updateReservationController);
router.delete('/reservations/:reservationId', deleteReservationController);

export default router;