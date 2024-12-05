import useAuth from "../../hooks/useAuth";
import UserMenuList from "./UserMenuList";
import UserBadge from "./UserBadge";
import { useEffect, useRef, useState } from "react";

const UserMenu: React.FC = () => {
  const { isUserLoggedIn, userInitial } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const toggleDropdownMenu = () => {
    setIsDropdownOpen((prevstate) => !prevstate);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    () => {
      return document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div
        role="button"
        className="btn btn-ghost btn-circle avatar"
        onClick={toggleDropdownMenu}
        ref={dropdownMenuRef}
      >
        <UserBadge isUserLoggedIn={isUserLoggedIn} userInitial={userInitial} />
      </div>
      {isDropdownOpen && <UserMenuList isUserLoggedIn={isUserLoggedIn} />}
    </div>
  );
};

export default UserMenu;
