import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import useCart from "../../hooks/useCart";

const CartBadge: React.FC = () => {
  const { totalCartItems } = useCart();
  return (
    <NavLink to={"/cart"} className="btn btn-ghost relative text-primary">
      <FontAwesomeIcon icon={faShoppingCart} size={"2xl"} />
      <div className="badge bg-orange-500 badge-lg absolute -top-1 -right-3 text-white">
        {totalCartItems}
      </div>
    </NavLink>
  );
};

export default CartBadge;
