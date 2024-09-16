// user info data types
export interface IUserInfo {
  userId: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface IAuthSlice {
  userInfo: IUserInfo | null;
}

// login data types
export interface ILoginData {
  email: string;
  password: string;
}
