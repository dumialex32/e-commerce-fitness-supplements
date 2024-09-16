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

type SetName = { type: "SET_NAME"; payload: string };
type SetEmail = { type: "SET_EMAIL"; payload: string };
type SetPassword = { type: "SET_PASSWORD"; payload: string };
type SetConfirmPassword = { type: "SET_CONFIRM_PASSWORD"; payload: string };
type SetErrors = { type: "SET_ERRORS"; payload: IErrors };
type setRegistrationSuccess = { type: "SET_REGISTRATION_SUCCESS" };

export type ActionType =
  | SetName
  | SetEmail
  | SetPassword
  | SetConfirmPassword
  | SetErrors
  | setRegistrationSuccess;
