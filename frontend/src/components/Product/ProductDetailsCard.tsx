import useCart from "../../hooks/useCart";
import { IProduct } from "../../types/productsTypes/productTypes";
import { formatPriceCurrency } from "../../utils/formatters";
import { getItemStockInfo } from "../../utils/productUtils";
import QuantitySelector from "../QuantitySelector";

const ProductDetailsCard: React.FC<{ product: IProduct }> = ({ product }) => {
  const { handleSelectQty, handleAddToCart, qty } = useCart();
  return (
    <div className="card bg-base-100 border-2">
      <div className="card-body divide-y-2">
        <h2 className="card-title">
          Price: <span>{formatPriceCurrency(product.price * qty)}</span>
        </h2>
        <div>
          <p className="py-2.5">
            <span className="text-gray-400 py-8">Status: </span>
            <span
              className={`${
                getItemStockInfo(product.countInStock).color
              } font-semibold`}
            >
              {getItemStockInfo(product.countInStock).text}
            </span>
          </p>
        </div>
        <div className="py-2.5">
          {product.countInStock >= 1 && (
            <QuantitySelector
              product={product}
              qty={qty}
              onHandleSelectQty={handleSelectQty}
            />
          )}
        </div>

        <button
          className="btn btn-primary"
          disabled={product.countInStock === 0}
          onClick={() => handleAddToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
