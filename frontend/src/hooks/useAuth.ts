import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IUserInfo } from "../types/user/authSliceTypes";

interface IUseAuth {
  userInfo: IUserInfo | null;
  isUserLoggedIn: boolean;
  userInitial: string | null;
}

const useAuth = (): IUseAuth => {
  // get user info
  const userInfo: IUserInfo | null = useSelector(
    (state: RootState) => state.auth.userInfo
  );

  // check if user is logged in
  const isUserLoggedIn: boolean = !isEmpty(userInfo);

  // get the user's name first letter
  const userInitial: string | null =
    userInfo && isUserLoggedIn ? userInfo.name.slice(0, 1) : null;
  console.log(userInitial);

  return { userInfo, isUserLoggedIn, userInitial };
};
export default useAuth;
