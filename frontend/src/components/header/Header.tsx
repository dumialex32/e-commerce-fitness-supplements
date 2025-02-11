import CartBadge from "../cart/CartBadge";
import HeaderControls from "./HeaderControls";

import Logo from "../Logo";
import UserMenu from "../user/UserMenu";
import Search from "../Search";

const Header: React.FC = () => {
  return (
    <header>
      <div className="navbar bg-base-200 px-12 flex items-center justify-between">
        <div className="">
          <Logo />
        </div>

        <Search />

        <HeaderControls>
          <UserMenu />

          <CartBadge />
        </HeaderControls>
      </div>
    </header>
  );
};

export default Header;
