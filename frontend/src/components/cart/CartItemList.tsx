import { ICartListProps } from "../../types/cartTypes/cartListTypes";

const CartList: React.FC<ICartListProps> = ({ cartItems, render }) => {
  return (
    <ul className="flex flex-col min-w-fit divide-y-2">
      {cartItems?.map(render)}
    </ul>
  );
};

export default CartList;
