import usePlaceOrder from "../../hooks/usePlaceOrder";
import { IOrder } from "../../types/Order/OrderTypes";

const PlaceOrderButton: React.FC<{ order: IOrder; disabled: boolean }> = ({
  order,
  disabled,
}) => {
  const { handleConfirmOrder, isLoading, error } = usePlaceOrder();
  return (
    <button
      onClick={() => handleConfirmOrder(order)}
      className="btn btn-primary"
      disabled={disabled}
    >
      Order now
    </button>
  );
};

export default PlaceOrderButton;
