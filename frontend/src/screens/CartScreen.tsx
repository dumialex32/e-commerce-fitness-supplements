import { useSelector } from "react-redux";
import { RootState } from "../store";
import CartItem from "../components/CartItem";
import useAppNavigate from "../hooks/useNavigate";

const CartScreen: React.FC = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  console.log(cartItems);
  const { moveBack } = useAppNavigate();

  return (
    <>
      <h1 className="text-3xl color mb-6 text-gray-600">Shopping cart</h1>
      <div className="grid grid-cols-2 gap-2">
        <ul className="flex flex-col min-w-fit divide-y-2">
          {cartItems.map((item) => {
            return <CartItem key={item._id} item={item} />;
          })}
        </ul>
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
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
