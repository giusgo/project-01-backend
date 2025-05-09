import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";
import { IBook } from "./book.model";

export interface IReservation extends Document {
  user: IUser["_id"];
  book: IBook["_id"];
  reservationDate: Date;
  returnDate: Date;
  status: "active" | "returned";
  isDeleted: boolean;
}

const ReservationSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    reservationDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    returnDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "returned"],
      required: true,
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IReservation>("Reservation", ReservationSchema);
