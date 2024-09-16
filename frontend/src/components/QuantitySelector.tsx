import { MAX_ORDER_PER_ITEM } from "../constants";
import { IQuantitySelectorProps } from "../types/componentsTypes/QuantitySelectorTypes";

const QuantitySelector: React.FC<IQuantitySelectorProps> = ({
  product,
  qty,
  onHandleSelectQty,
}) => {
  return (
    <div className="border border-gray-300 rounded-md px-3 py-2 relative">
      <span>Quantity: {qty}</span>
      <select
        className="absolute inset-0 opacity-0 cursor-pointer"
        value={qty}
        onChange={onHandleSelectQty}
      >
        <option value="" disabled hidden>
          Quantity
        </option>
        {Array.from(
          {
            length:
              product.countInStock >= MAX_ORDER_PER_ITEM
                ? MAX_ORDER_PER_ITEM
                : product.countInStock,
          },
          (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default QuantitySelector;
