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
  RegisterFormField,
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
    case "SET_FIELD": {
      const value = action.payload.value;
      const field = action.payload.field;
      return {
        ...state,
        [field]: value,
      };
    }

    case "SET_ERRORS": {
      return { ...state, errors: { ...state.errors, ...action.payload } };
    }

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

const validateRegisterFormField: Record<
  RegisterFormField,
  (value1: string, value2?: string) => string
> = {
  name: validateName,
  email: validateEmail,
  password: validatePassword,
  confirmPassword: validatePassword,
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

  const setRegisterFormField = (field: RegisterFormField, value: string) => {
    const validate = validateRegisterFormField[field];
    const errorMessage =
      field === "confirmPassword" ? validate(password, value) : validate(value);

    dispatch({ type: "SET_FIELD", payload: { field, value } });
    dispatch({ type: "SET_ERRORS", payload: { [field]: errorMessage } });
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
    setRegisterFormField,
    handleRegisterFormSubmit,
  };
};

export default useRegisterForm;
