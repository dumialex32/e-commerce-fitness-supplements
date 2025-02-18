import usePlaceOrder from "../../hooks/usePlaceOrder";
import { Order } from "../../types/orderTypes/OrderTypes";

const PlaceOrderButton: React.FC<{ order: Order; disabled: boolean }> = ({
  order,
  disabled,
}) => {
  const { handlePlaceOrder } = usePlaceOrder();

  return (
    <button
      onClick={() => handlePlaceOrder(order)}
      className="btn btn-primary"
      disabled={disabled}
    >
      Place order
    </button>
  );
};

export default PlaceOrderButton;
