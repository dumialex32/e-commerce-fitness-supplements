import { Product } from "../../types/productsTypes/productTypes";
import { formatPriceCurrency } from "../../utils/formatters";
import Rating from "../Rating";

Rating;
const ProductDetails: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="flex flex-col border-opacity-50">
      <div className="grid">
        <h3 className="text-3xl font-semibold">{product.name}</h3>
      </div>
      <div className="divider"></div>
      <div className="px-3">
        <Rating
          value={product.rating}
          reviews={product.numReviews}
          direction="horizontal"
          starNum={5}
        />
      </div>
      <div className="divider"></div>
      <p className="px-3 text-lg text-gray-500 font-semibold">
        Price: {formatPriceCurrency(product.price)}
      </p>
      <div className="divider"></div>
      <p className="text-sm px-3">{product.description}</p>
    </div>
  );
};

export default ProductDetails;
