import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";

const UserMenuList: React.FC<{
  isUserLoggedIn: boolean;
  // isDropdownOpen: boolean;
}> = ({ isUserLoggedIn, isDropdownOpen }) => {
  const [logoutApiCall, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserLogout = async () => {
    try {
      const res = await logoutApiCall().unwrap();

      dispatch(logout());

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* {isDropdownOpen && ( */}
      <ul className="absolute right-0 menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
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
    </>
  );
};

export default UserMenuList;
