import { useReducer } from "react";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/formUtils";
import { Bounce, toast } from "react-toastify";

interface IinitialState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    registrationError: string;
  };
  isRegistrationSuccess: boolean;
}

type TactionType =
  | "SET_NAME"
  | "SET_EMAIL"
  | "SET_PASSWORD"
  | "SET_ERRORS"
  | "SET_CONFIRM_PASSWORD"
  | "SET_REGISTRATION_SUCCESS";

interface Iaction {
  type: TactionType;
  payload?: string | { [key: string]: string };
}

const reducer = (state: IinitialState, action: Iaction) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload as string };

    case "SET_EMAIL":
      return { ...state, email: action.payload as string };

    case "SET_PASSWORD":
      return { ...state, password: action.payload as string };

    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload as string };

    case "SET_ERRORS":
      return {
        ...state,
        errors: { ...state.errors, ...(action.payload as object) },
      };

    case "SET_REGISTRATION_SUCCESS":
      return { ...state, isRegistrationSuccess: true };

    default:
      return state;
  }
};

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    registrationError: "",
  },
  isRegistrationSuccess: false,
};

const useRegisterForm = () => {
  const [
    { name, email, password, errors, isRegistrationSuccess, confirmPassword },
    dispatch,
  ] = useReducer(reducer, initialState);

  // retrieve the register mutation hook and the loading state from userApiSlice
  const [register, { isLoading }] = useRegisterMutation();

  const isFormInvalid =
    !name ||
    !email ||
    !password ||
    errors.name ||
    errors.email ||
    errors.password
      ? true
      : false;

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { name, email, password };

    try {
      const res = await register(userData).unwrap();

      setRegistrationSuccess();

      toast.success("Registration successfully done", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (err: any) {
      if (err.status === 400 && err.data.message) {
        dispatch({
          type: "SET_ERRORS",
          payload: { registrationError: err.data.message },
        });
        toast.error(err.data.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  const setName = (name: string) => {
    const validateNameError = validateName(name);

    dispatch({ type: "SET_NAME", payload: name });
    dispatch({ type: "SET_ERRORS", payload: { name: validateNameError } });
  };

  const setPassword = (password: string) => {
    const validatePasswordError = validatePassword(password);
    dispatch({ type: "SET_PASSWORD", payload: password });
    dispatch({
      type: "SET_ERRORS",
      payload: { password: validatePasswordError },
    });
  };

  const setEmail = (email: string) => {
    const validateEmailError = validateEmail(email);
    dispatch({ type: "SET_EMAIL", payload: email });
    dispatch({ type: "SET_ERRORS", payload: { email: validateEmailError } });
  };

  const setConfirmPassword = (confirmPassword: string) => {
    const confirmPasswordError = validatePassword(confirmPassword, password);
    dispatch({ type: "SET_CONFIRM_PASSWORD", payload: confirmPassword });
    dispatch({
      type: "SET_ERRORS",
      payload: { confirmPassword: confirmPasswordError },
    });
  };

  const setRegistrationSuccess = () => {
    dispatch({ type: "SET_REGISTRATION_SUCCESS" });
  };

  return {
    name,
    email,
    password,
    confirmPassword,
    errors,
    isFormInvalid,
    isLoading,
    isRegistrationSuccess,
    setName,
    setPassword,
    setConfirmPassword,
    setEmail,
    handleRegisterSubmit,
  };
};

export default useRegisterForm;
