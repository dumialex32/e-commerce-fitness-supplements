import { useReducer } from "react";
import {
  useProfileMutation,
  useRegisterMutation,
} from "../slices/usersApiSlice";
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
import useAuth from "./useAuth";
import { IUserInfo } from "../types/userTypes/authSliceTypes";
import { checkFormInputs } from "../utils/formUtils/formUtils";

const init = (userInfo: IUserInfo | null) => ({
  name: userInfo?.name || "",
  email: userInfo?.email || "",
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
});

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

    case "RESET_FORM":
      return {
        ...init(action.payload),
      };

    default:
      return state;
  }
};

const useRegisterForm = () => {
  const { userInfo } = useAuth();

  const [
    { name, email, password, errors, isRegistrationSuccess, confirmPassword },
    dispatch,
  ] = useReducer(reducer, userInfo, init);

  // retrieve the profile mutation hook from users api slice
  const [updateProfile, { isLoading: isLoadingProfileUpdate }] =
    useProfileMutation();

  // retrieve the register mutation hook and the loading state from userApiSlice
  const [register, { isLoading }] = useRegisterMutation();

  const reduxDispatch = useDispatch(); // renamed to reduxDispatch since we have another dispatch from useReducer

  const isFormInvalid = checkFormInputs(
    { name, email, password, confirmPassword },
    errors
  );

  const handleRegisterFormSubmit = async (
    e: React.FormEvent,
    isUpdating: boolean
  ) => {
    e.preventDefault();

    dispatch({
      type: "SET_ERRORS",
      payload: { registrationError: "" },
    });

    const userData = { name, email, password };

    try {
      const userInfo: IUserInfo = isUpdating
        ? await updateProfile(userData).unwrap()
        : await register(userData).unwrap();
      setRegistrationSuccess();
      createToast(
        `${isUpdating ? "Profile updated" : "Register successfully done"}`,
        {
          type: "success",
          orientation: "bottom-center",
        }
      );
      setTimeout(() => reduxDispatch(setCredentials(userInfo)), 3000);

      setCredentials(userInfo);
      resetFormFields(userInfo);
    } catch (err: any) {
      console.error(err);
      if (err.status === 400 && err.data.message) {
        dispatch({
          type: "SET_ERRORS",
          payload: {
            registrationError: err.data.message || "An unknown error occured",
          },
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

  const resetFormFields = (userInfo: IUserInfo) => {
    dispatch({ type: "RESET_FORM", payload: userInfo });
  };

  return {
    name,
    email,
    password,
    confirmPassword,
    errors,
    isFormInvalid,
    isLoading,
    isLoadingProfileUpdate,
    isRegistrationSuccess,
    setName,
    setPassword,
    setConfirmPassword,
    setEmail,
    handleRegisterFormSubmit,
  };
};

export default useRegisterForm;
