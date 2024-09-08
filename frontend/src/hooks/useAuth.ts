import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IUserInfo } from "../types/user/authSliceTypes";
import { FormEvent, useState } from "react";
import { useLoginMutation } from "../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";

const useAuth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleAuthSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setError(null);
      const userInfo: IUserInfo = await login({ email, password }).unwrap();

      if (userInfo && !isEmpty(userInfo)) {
        dispatch(setCredentials(userInfo));
        navigate("/");
      }
    } catch (error: any) {
      if (error.status === 401) {
        console.error(error);
        setError(error?.data.message);
      } else {
        setError("An unknown error occured. Please try again");
      }
    }
  };

  // get user info
  const userInfo: IUserInfo | null = useSelector(
    (state: RootState) => state.auth.userInfo
  );

  // check if user is logged in
  const isUserLoggedIn: boolean = !isEmpty(userInfo);

  // get the user's name first letter
  const userInitial: string | null =
    userInfo && isUserLoggedIn ? userInfo.name.slice(0, 1) : null;

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
