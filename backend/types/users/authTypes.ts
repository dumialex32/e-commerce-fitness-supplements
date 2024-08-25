import { Types } from "mongoose";

// auth response interface
export interface IAuthResponse {
  userId: Types.ObjectId;
  name: string;
  email: string;
  isAdmin: boolean;
}
