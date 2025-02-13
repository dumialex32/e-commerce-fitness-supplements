import { User } from "./usersSliceTypes";

export interface EditUserFormInitialState {
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface EditUserFormErrors {
  name: string;
  email: string;
}

export interface EditUserFormProps {
  user: User;
  onCloseModal: () => void;
}
