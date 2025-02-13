import { useSelector } from "react-redux";
import { RootState } from "../store";
import { UserInfo } from "../types/authTypes/authSliceTypes";
import { FormEvent, useState } from "react";
import { useLoginMutation } from "../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { renderFetchBaseQueryError } from "../utils/errorHelpers";
import { DEFAULT_ERROR_MESSAGE } from "../constants";

const useAuth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleAuthSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoading || !email || !password) return;

    try {
      setError(null);
      const userInfo: UserInfo = await login({ email, password }).unwrap();
      console.log(userInfo);
      console.log(isValidUser(userInfo));

      if (isValidUser(userInfo)) {
        dispatch(setCredentials(userInfo));
        navigate("/");
      }
    } catch (err: any) {
      console.error(error);
      setError(renderFetchBaseQueryError(err) || DEFAULT_ERROR_MESSAGE);
    }
  };

  // get user info
  const userInfo: UserInfo | null = useSelector(
    (state: RootState) => state.auth.userInfo
  );

  // check if user is logged in and validate the id and email fields
  const isValidUser = (user: UserInfo | null): boolean => {
    if (!user) {
      return false;
    }

    return Boolean(user.userId && user.email && user.name);
  };

  const isUserLoggedIn = isValidUser(userInfo);

  // get the user's name first letter
  const userInitial: string | null = userInfo?.name?.[0] || null;

  return {
    email,
    password,
    error,
    isLoading,
    userInfo,
    isUserLoggedIn,
    userInitial,
    handleAuthSubmit,
    setPassword,
    setEmail,
  };
};
export default useAuth;
