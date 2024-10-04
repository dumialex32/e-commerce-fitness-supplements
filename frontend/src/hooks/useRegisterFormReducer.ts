import { useReducer } from "react";
import { useRegisterMutation } from "../slices/usersApiSlice";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/formUtils/registerFormUtils";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { createToast } from "../utils/toastUtils";
import {
  ActionType,
  IinitialState,
} from "../types/authTypes/registerFormReducerTypes";
import { checkFormInputs } from "../utils/utils";

const reducer = (state: IinitialState, action: ActionType) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };

    case "SET_EMAIL":
      return { ...state, email: action.payload };

    case "SET_PASSWORD":
      return { ...state, password: action.payload };

    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };

    case "SET_ERRORS":
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
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

  const reduxDispatch = useDispatch(); // renamed to reduxDispatch since we have another dispatch from useReducer

  const isFormInvalid = checkFormInputs(
    { name, email, password, confirmPassword },
    errors
  );

  const handleRegisterFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { name, email, password };

    try {
      const res = await register(userData).unwrap();
      setRegistrationSuccess();
      createToast("Register successfully done.", {
        type: "success",
        orientation: "bottom-center",
      });
      setTimeout(() => reduxDispatch(setCredentials(res)), 3000);
    } catch (err: any) {
      console.error(err);
      if (err.status === 400 && err.data.message) {
        dispatch({
          type: "SET_ERRORS",
          payload: { registrationError: err.data.message },
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
    handleRegisterFormSubmit,
  };
};

export default useRegisterForm;
