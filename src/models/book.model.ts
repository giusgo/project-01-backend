import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  publisher: string;
  availability: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
      trim: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBook>("Book", BookSchema);
