import Reservation from "../../models/reservation.model";

interface DeleteReservationInput {
  reservationId: string;
}

export const deleteReservation = async (
  input: DeleteReservationInput
): Promise<void> => {
  const { reservationId } = input;

  // Find the reservation by ID
  const reservation = await Reservation.findById(reservationId);

  if (!reservation || reservation.isDeleted) {
    throw new Error("Reservation not found");
  }

  // Perform soft delete by setting isDeleted to true
  reservation.isDeleted = true;

  // Save the updated reservation to the database
  await reservation.save();
};
