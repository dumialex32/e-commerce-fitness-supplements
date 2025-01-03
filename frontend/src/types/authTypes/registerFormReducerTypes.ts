import { IUserInfo } from "../userTypes/authSliceTypes";

export type RegisterFormField =
  | "name"
  | "email"
  | "password"
  | "confirmPassword";

export interface IErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  registrationError?: string;
}

export interface IinitialState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: IErrors;
  isRegistrationSuccess: boolean;
}

type SetRegistrationFieldAction = {
  type: "SET_FIELD";
  payload: { field: RegisterFormField; value: string };
};
type SetErrorsAction = { type: "SET_ERRORS"; payload: Partial<IErrors> };
type setRegistrationSuccessAction = { type: "SET_REGISTRATION_SUCCESS" };
type SetResetFormAction = { type: "RESET_FORM"; payload: IUserInfo | null };

export type ActionType =
  | SetRegistrationFieldAction
  | SetErrorsAction
  | setRegistrationSuccessAction
  | SetResetFormAction;
