import useAuth from "../../hooks/useAuth";
import UserBadge from "./UserBadge";
import { useEffect, useRef, useState } from "react";
import UserMenuList from "./UserMenuList";
import { useLocation } from "react-router-dom";
import useClickOutsideHook from "../../hooks/useClickOutsideHook";

const UserMenu: React.FC = () => {
  const { isUserLoggedIn, userInitial } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();

  useClickOutsideHook(dropdownMenuRef, () => setIsDropdownOpen(false));
  const toggleDropdownMenu = () => {
    setIsDropdownOpen((prevstate) => !prevstate);
  };

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  return (
    <div className="relative" ref={dropdownMenuRef}>
      <div
        role="button"
        className="btn btn-ghost btn-circle avatar"
        onClick={toggleDropdownMenu}
      >
        <UserBadge isUserLoggedIn={isUserLoggedIn} userInitial={userInitial} />
      </div>
      {isDropdownOpen && <UserMenuList isUserLoggedIn={isUserLoggedIn} />}
    </div>
  );
};

export default UserMenu;
