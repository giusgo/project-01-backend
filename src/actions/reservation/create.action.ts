import Reservation, { IReservation } from "../../models/reservation.model";

interface CreateReservationInput {
  user: string;
  book: string;
  reservationDate: Date;
}

export const createReservation = async (
  input: CreateReservationInput
): Promise<IReservation> => {
  const { user, book, reservationDate } = input;

  // Create a new reservation
  const newReservation = new Reservation({
    user,
    book,
    reservationDate: reservationDate || new Date(),
    status: "active",
  });

  // Save the reservation to the database
  await newReservation.save();

  return newReservation;
};
