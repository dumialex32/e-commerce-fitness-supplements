import { Link } from "react-router-dom";
import { ICartItem } from "../../types/cart/cartItemTypes";
import { formatPriceCurrency } from "../../utils/formatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useCart from "../../hooks/useCart";
import { MAX_ORDER_PER_ITEM } from "../../constants";

const CartItem: React.FC<{ item: ICartItem }> = ({ item }) => {
  const { handleChangeItemQty } = useCart();

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
          <div className="border border-gray-300 rounded-md px-3 py-2 relative">
            <span>Quantity: {item.qty}</span>
            <select
              className="absolute inset-0 opacity-0 cursor-pointer"
              value={item.qty}
              onChange={(e) => handleChangeItemQty(e, item)}
            >
              <option value="" disabled hidden>
                Quantity
              </option>
              {Array.from(
                {
                  length:
                    item.countInStock >= MAX_ORDER_PER_ITEM
                      ? MAX_ORDER_PER_ITEM
                      : item.countInStock,
                },
                (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                )
              )}
            </select>
          </div>
          <button className="btn btn-ghost">
            <FontAwesomeIcon icon={faTrash} size="xl" color="gray" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
