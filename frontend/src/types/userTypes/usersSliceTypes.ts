// Get all users types
export interface IUser {
  createdAt: string;
  email: string;
  isAdmin: boolean;
  name: string;
  _id: string;
}

export interface IuseGetUsersQuery {
  data: IUser[];
}
