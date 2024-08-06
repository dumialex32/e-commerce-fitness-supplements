import { Link } from "react-router-dom";
import { ICartItem } from "../types/cart/cartItemTypes";
import { formatPriceCurrency } from "../utils/formatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CartItem: React.FC<{ item: ICartItem }> = ({ item }) => {
  return (
    <li className="grid grid-cols-[2fr_1fr_2fr] gap-14 p-4">
      <div className="flex gap-5">
        <img src={item.image} className="h-24 rounded-md" />
        <div className="flex flex-col text-gray-600 font-semibold">
          <Link to={`/product/${item._id}`} className="text-primary">
            {item.name}
          </Link>
          <p className="text-sm text-gray-400">{item.category}</p>
        </div>
      </div>
      <p className={`text-gray-500 font-semibold`}>
        {formatPriceCurrency(item.price)}
      </p>
      <div>
        <div className="flex gap-6 items-center">
          <button>
            <FontAwesomeIcon icon={faTrash} size="xl" color="gray" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
