import usePlaceOrder from "../../hooks/usePlaceOrder";
import { IOrder } from "../../types/orderTypes/OrderTypes";

const PlaceOrderButton: React.FC<{ order: IOrder; disabled: boolean }> = ({
  order,
  disabled,
}) => {
  const { handlePlaceOrder, isLoading, error } = usePlaceOrder();
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
