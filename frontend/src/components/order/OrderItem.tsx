import { IOrderItem } from "../../types/Order/OrderTypes";
import { formatPriceCurrency } from "../../utils/formatters";

const OrderItem: React.FC<{ orderItem: IOrderItem }> = ({ orderItem }) => {
  return (
    <li className="grid grid-cols-[2fr_1fr] gap-2 items-center">
      <div className="flex gap-2 items-center">
        <p>x{orderItem.qty}</p>
        <img src={orderItem.image} className="h-10 w-10" />
        <p className="underline">{orderItem.name}</p>
      </div>

      <p>{formatPriceCurrency(orderItem.price)}</p>
    </li>
  );
};

export default OrderItem;