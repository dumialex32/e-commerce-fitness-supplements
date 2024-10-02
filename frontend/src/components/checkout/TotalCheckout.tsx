import { formatPriceCurrency } from "../../utils/formatters";
import TotalCheckoutPrice from "./TotalCheckoutPrice";

const TotalCheckout: React.FC<{
  totalPrice: number;
  shippingPrice: number;
  itemsPrice: number;
  taxPrice: number;
}> = ({ totalPrice, shippingPrice, itemsPrice, taxPrice }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[1fr_1fr] text-sm">
        <p>Products:</p>
        <p className="justify-self-end">{formatPriceCurrency(itemsPrice)}</p>
      </div>

      <div className="grid grid-cols-[1fr_1fr] text-sm">
        <p>Shipping costs:</p>
        <p className="justify-self-end">{formatPriceCurrency(shippingPrice)}</p>
      </div>

      <div className="grid grid-cols-[1fr_1fr] text-sm">
        <p>VAT:</p>
        <p className="justify-self-end">{formatPriceCurrency(taxPrice)}</p>
      </div>

      <div className="grid grid-cols-[1fr_1fr]">
        <TotalCheckoutPrice totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default TotalCheckout;
