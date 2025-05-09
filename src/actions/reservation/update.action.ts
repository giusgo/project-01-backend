import Reservation, { IReservation } from '../../models/reservation.model';

interface UpdateReservationInput {
  reservationId: string;
  updates: Partial<{
    returnDate: Date;
  }>;
}

export const updateReservation = async (
  input: UpdateReservationInput
): Promise<IReservation | null> => {
  const { reservationId, updates } = input;

  // Find the reservation by ID
  const reservation = await Reservation.findById(reservationId);

  if (!reservation || reservation.isDeleted) {
    throw new Error('Reservation not found');
  }

  // Update fields if provided
  if (updates.returnDate) {
    reservation.returnDate = updates.returnDate;
    reservation.status = 'returned';
  } else {
    reservation.status = 'active';
  }

  // Save the updated reservation to the database
  await reservation.save();

  return reservation;
};