// user info data types
export interface UserInfo {
  userId: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface IAuthSlice {
  userInfo: UserInfo | null;
}

// login data types
export interface LoginData {
  email: string;
  password: string;
}
