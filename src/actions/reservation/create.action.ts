import Reservation, { IReservation } from "../../models/reservation.model";
import Book from "../../models/book.model";

interface CreateReservationInput {
  user: string;
  book: string;
  reservationDate: Date;
}

export const createReservation = async (
  input: CreateReservationInput
): Promise<IReservation> => {
  const { user, book, reservationDate } = input;

  // Check if the book is available
  const bookToReserve = await Book.findById(book);
  if (!bookToReserve || bookToReserve.isDeleted || !bookToReserve.availability) {
    throw new Error('Book is not available for reservation');
  }

  // Create a new reservation
  const newReservation = new Reservation({
    user,
    book,
    reservationDate: reservationDate || new Date(),
    status: "active",
  });

  // Save the reservation to the database
  await newReservation.save();

  // Update the book's availability
  bookToReserve.availability = false;
  await bookToReserve.save();

  return newReservation;
};
