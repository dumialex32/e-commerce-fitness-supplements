import { UserInfo } from "./authSliceTypes";

export type RegisterFormField =
  | "name"
  | "email"
  | "password"
  | "confirmPassword";

export interface RegisterFormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  registrationError?: string;
}

export interface RegisterFormInitialState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: RegisterFormErrors;
  isRegistrationSuccess: boolean;
}

type SetRegistrationFieldAction = {
  type: "SET_FIELD";
  payload: { field: RegisterFormField; value: string };
};
type SetErrorsAction = {
  type: "SET_ERRORS";
  payload: Partial<RegisterFormErrors>;
};
type setRegistrationSuccessAction = { type: "SET_REGISTRATION_SUCCESS" };
type SetResetFormAction = { type: "RESET_FORM"; payload: UserInfo | null };

export type ActionType =
  | SetRegistrationFieldAction
  | SetErrorsAction
  | setRegistrationSuccessAction
  | SetResetFormAction;
