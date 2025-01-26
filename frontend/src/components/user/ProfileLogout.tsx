import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { renderFetchBaseQueryError } from "../../utils/errorHelpers";
import { createToast } from "../../utils/toastUtils";
import { logout } from "../../slices/authSlice";
import ButtonLoader from "../ButtonLoader";

const ProfileLogout: React.FC = () => {
  const dispatch = useDispatch();
  const [logoutApi, { isLoading }] = useLogoutMutation();

  const handleProfileLogout = async () => {
    try {
      const res = await logoutApi().unwrap();
      dispatch(logout());

      createToast(res.message || "Logged out succesfully", { type: "success" });
    } catch (err: any) {
      console.error(err);
      createToast(
        renderFetchBaseQueryError(err) || "Log out failed. Please try again",
        { type: "error" }
      );
    }
  };

  return (
    <button onClick={handleProfileLogout}>
      {isLoading ? <ButtonLoader text="Logging out..." /> : "Logout"}
    </button>
  );
};

export default ProfileLogout;
