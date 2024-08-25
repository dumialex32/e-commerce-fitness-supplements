import useAuth from "../../hooks/useAuth";
import UserMenuList from "./UserMenuList";
import UserBadge from "./UserBadge";

const UserMenu: React.FC = () => {
  const { isUserLoggedIn, userInitial } = useAuth();

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar flex items-center"
      >
        <UserBadge isUserLoggedIn={isUserLoggedIn} userInitial={userInitial} />
      </div>
      <UserMenuList isUserLoggedIn={isUserLoggedIn} />
    </div>
  );
};

export default UserMenu;
