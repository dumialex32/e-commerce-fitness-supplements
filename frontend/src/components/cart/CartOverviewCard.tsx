import useCart from "../../hooks/useCart";
import { formatPriceCurrency } from "../../utils/formatters";
import CheckoutButton from "./CheckoutButton";

const CartOverviewCard: React.FC = () => {
  const { totalCartItems, totalCartItemsPrice, handleCheckout } = useCart();
  return (
    <div className="card bg-base-100 w-96 shadow-xl h-80">
      <div className="card-body">
        <h2 className="card-title">Subtotal ({totalCartItems}) items</h2>
        <p className="text-gray-500 font-semibold">
          Total price: {formatPriceCurrency(totalCartItemsPrice)}
        </p>
        <div className="divider m-0 mb-8"></div>
        <div className="card-actions justify-center">
          <CheckoutButton handleCheckout={handleCheckout} />
        </div>
      </div>
    </div>
  );
};

export default CartOverviewCard;
