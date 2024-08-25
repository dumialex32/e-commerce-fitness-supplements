import { Link } from "react-router-dom";

const UserMenuList: React.FC<{ isUserLoggedIn: boolean }> = ({
  isUserLoggedIn,
}) => {
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
            <button>Logout</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        </ul>
      )}
    </ul>
  );
};

export default UserMenuList;
