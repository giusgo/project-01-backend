import Reservation, { IReservation } from "../../models/reservation.model";
import Book from "../../models/book.model";

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
    throw new Error("Reservation not found");
  }

  // Update the book's availability
  const bookToUpdate = await Book.findById(reservation.book);

  // Update fields if provided
  if (updates.returnDate) {
    reservation.returnDate = updates.returnDate;
    reservation.status = "returned";

    if (bookToUpdate) {
      bookToUpdate.availability = true;
      await bookToUpdate.save();
    }
  } else {
    reservation.status = "active";
    reservation.returnDate = null;

    if (bookToUpdate) {
      bookToUpdate.availability = false;
      await bookToUpdate.save();
    }
  }

  // Save the updated reservation to the database
  await reservation.save();

  return reservation;
};
