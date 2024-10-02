import { formatPriceCurrency } from "../../utils/formatters";

const TotalCheckoutPrice: React.FC<{ totalPrice: number }> = ({
  totalPrice,
}) => {
  return (
    <>
      <p className="font-semibold">Total:</p>
      <p className="text-XL font-semibold justify-self-end">
        {formatPriceCurrency(totalPrice)}
      </p>
    </>
  );
};

export default TotalCheckoutPrice;
