import { IOrder } from "../../types/Order/OrderTypes";
import { useCreateOrderMutation } from "../../slices/ordersApiSlice";

const PlaceOrderButton: React.FC<{ order: IOrder }> = ({ order }) => {
  const [createOrder, { isLoading, errror }] = useCreateOrderMutation();

  const handleConfirmOrder = async () => {
    const order = await createOrder(order);
  };

  return (
    <button onClick={handleConfirmOrder} className="btn btn-primary">
      Order now
    </button>
  );
};

export default PlaceOrderButton;
