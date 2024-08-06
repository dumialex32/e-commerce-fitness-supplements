import { useSelector } from "react-redux";
import { RootState } from "../store";
import CartItem from "../components/cart/CartItem";
import useAppNavigate from "../hooks/useNavigate";
import CartOverviewCard from "../components/cart/CartOverviewCard";
import CartList from "../components/cart/CartList";
import { ICartItem } from "../types/cart/cartItemTypes";

const CartScreen: React.FC = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const { moveBack } = useAppNavigate();

  return (
    <>
      <h1 className="text-3xl color mb-6 text-gray-600">Shopping cart</h1>
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <CartList
          cartItems={cartItems}
          render={(cartItem: ICartItem) => {
            return <CartItem key={cartItem._id} item={cartItem} />;
          }}
        />

        <CartOverviewCard />
      </div>
      <button className="btn btn-sm mt-6" onClick={moveBack}>
        Back
      </button>
    </>
  );
};

export default CartScreen;
