import { UserInfo } from "../authTypes/authSliceTypes";

export interface User {
  email: string;
  isAdmin: boolean;
  name: string;
  _id: string;
  createdAt: string;
}

// get users types
export type GetUsersResponse = User[];

// get user info types
export type LoginResponse = UserInfo;
export interface LoginProps {
  email: string;
  password: string;
}

// user register types
export type RegisterResponse = User;
export type RegisterProps = Omit<User, "_id" | "isAdmin" | "createdAt">;

// logout user types
export interface LogoutResponse {
  message: string;
}

// update user types
interface UpdateUserPatch {
  name: string;
  email: string;
  isAdmin: boolean;
}
export interface UpdateUserResponse {
  updatedUser: User;
  message: string;
}
export interface UpdateUserMutationProps {
  userId: string;
  patch: UpdateUserPatch;
}

// delete user types
export interface DeleteUserResponse {
  message: string;
}
export type DeleteUserProps = string;
