import mongoose, { Schema, Document } from "mongoose";

export interface IUserPermissions {
  createBooks?: boolean;
  modifyUsers?: boolean;
  modifyBooks?: boolean;
  deleteUsers?: boolean;
  deleteBooks?: boolean;
}

export interface IUser extends Document {
  email: string;
  password: string;
  permissions: IUserPermissions;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    permissions: {
      createBooks: {
        type: Boolean,
        default: false,
      },
      modifyUsers: {
        type: Boolean,
        default: false,
      },
      modifyBooks: {
        type: Boolean,
        default: false,
      },
      deleteUsers: {
        type: Boolean,
        default: false,
      },
      deleteBooks: {
        type: Boolean,
        default: false,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
