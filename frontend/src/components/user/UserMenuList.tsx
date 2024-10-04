import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";

const UserMenuList: React.FC<{ isUserLoggedIn: boolean }> = ({
  isUserLoggedIn,
}) => {
  const [logoutApiCall, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserLogout = async () => {
    try {
      const res = await logoutApiCall().unwrap();
      dispatch(logout());
      useNavigate;
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
    >
      {isUserLoggedIn ? (
        <ul>
          <li>
            <Link to={"/profile"} className="justify-between">
              Profile
            </Link>
          </li>
          <li>
            <button onClick={handleUserLogout}>Logout</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li className="font-semibold">
            <Link to={"/login"}>Login / Sign up</Link>
          </li>
        </ul>
      )}
    </ul>
  );
};

export default UserMenuList;
