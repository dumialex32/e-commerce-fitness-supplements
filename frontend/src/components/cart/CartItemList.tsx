import { CartListProps } from "../../types/cartTypes/cartListTypes";

const CartList: React.FC<CartListProps> = ({ cartItems, render }) => {
  return (
    <ul className="flex flex-col min-w-fit divide-y-2">
      {cartItems?.map(render)}
    </ul>
  );
};

export default CartList;
