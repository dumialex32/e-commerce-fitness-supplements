import { useSelector } from "react-redux";
import { RootState } from "../store";
import CartItem from "../components/CartItem";
import useAppNavigate from "../hooks/useNavigate";
import { formatPriceCurrency } from "../utils/formatters";
import useCart from "../hooks/useCart";

const CartScreen: React.FC = () => {
  const { cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  console.log(cartItems);
  const { qty, totalCartItems } = useCart();
  const { moveBack } = useAppNavigate();
  console.log(qty);
  return (
    <>
      <h1 className="text-3xl color mb-6 text-gray-600">Shopping cart</h1>
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <ul className="flex flex-col min-w-fit divide-y-2">
          {cartItems.map((item) => {
            return <CartItem key={item._id} item={item} />;
          })}
        </ul>

        <div className="card bg-base-100 w-96 shadow-xl h-80">
          <div className="card-body">
            <h2 className="card-title">Subtotal ({totalCartItems}) items</h2>
            <p className="text-gray-500 font-semibold">
              Total price: {formatPriceCurrency(totalPrice)}
            </p>
            <div className="divider m-0 mb-8"></div>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">Proceed to checkout</button>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-sm mt-6" onClick={moveBack}>
        Back
      </button>
    </>
  );
};

export default CartScreen;
