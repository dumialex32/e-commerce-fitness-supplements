import mongoose from "mongoose";

import { IUserSchema } from "../types/databaseTypes/userModelTypes";

const userSchema = new mongoose.Schema<IUserSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUserSchema>("User", userSchema);

export default User;
