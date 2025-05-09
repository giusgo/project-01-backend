import Reservation, { IReservation } from '../../models/reservation.model';

interface ReadReservationByIdInput {
  reservationId: string;
}

interface ReadReservationsInput {
  userId?: string;
  bookId?: string;
}

export const readReservationById = async (
  input: ReadReservationByIdInput
): Promise<IReservation | null> => {
  const { reservationId } = input;

  // Find the reservation by ID
  const reservation = await Reservation.findById(reservationId);

  if (!reservation || reservation.isDeleted) {
    throw new Error('Reservation not found');
  }

  return reservation;
};

export const readReservations = async (
  input: ReadReservationsInput
): Promise<IReservation[]> => {
  const { userId, bookId } = input;

  // Build query based on userId or bookId
  const query: any = { isDeleted: false };

  if (userId) {
    query.user = userId;
  }

  if (bookId) {
    query.book = bookId;
  }

  // Find reservations matching the query
  const reservations = await Reservation.find(query);

  return reservations;
};