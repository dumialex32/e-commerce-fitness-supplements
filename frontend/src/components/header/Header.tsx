import CartBadge from "../cart/CartBadge";
import HeaderControls from "./HeaderControls";

import Logo from "../Logo";
import UserMenu from "../user/UserMenu";

const Header: React.FC = () => {
  return (
    <header>
      <div className="navbar bg-base-200 px-12">
        <div className="flex-1">
          <Logo />
        </div>

        <HeaderControls>
          <CartBadge />
          <UserMenu />
        </HeaderControls>
      </div>
    </header>
  );
};

export default Header;
