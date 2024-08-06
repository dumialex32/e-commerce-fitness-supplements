import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Header: React.FC = () => {
  const inCartProducts: number = useSelector(
    (state: RootState) => state.cart.cartItems.length
  );

  return (
    <header>
      <div className="navbar bg-base-200 px-12">
        <div className="flex-1 ">
          <Link to="/">
            <img src="images/logo.png" className="h-16" />
          </Link>
        </div>
        <div className="flex-none gap-6 ">
          <NavLink to={"/cart"} className="btn btn-ghost relative">
            <FontAwesomeIcon icon={faShoppingCart} color="blue" size={"2xl"} />
            <div className="badge bg-orange-500 badge-lg absolute -top-1 -right-3 text-white">
              {inCartProducts}
            </div>
            {/* <div className="absolute -top-1 right-1 flex items-center justify-center w-5 h-5 rounded-full text-white bg-orange-400">
              {productsNum}
            </div> */}
          </NavLink>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="images\placeholder-300x248.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
