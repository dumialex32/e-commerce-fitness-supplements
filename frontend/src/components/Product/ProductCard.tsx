import { IProduct } from "../../types/products/productTypes";
import { formatPriceCurrency } from "../../utils/formatters";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import useAppNavigate from "../../hooks/useNavigate";

const ProductCard = ({ product }: { product: IProduct }) => {
  const { moveTo } = useAppNavigate();
  return (
    <li className="w-full md:w-1/2 lg:w-1/6 p-2">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <Link to={`product/${product._id}`}>
            <img src={product.image} alt={product.name} />
          </Link>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {product.description}
          </p>
          <p className="text-xl font-bold">
            {formatPriceCurrency(product.price)}
          </p>
          <Rating
            value={product.rating}
            reviews={product.numReviews}
            starNum={5}
            direction="vertical"
          />
          <div className="card-actions justify-start">
            <button
              className="btn btn-primary text-white"
              onClick={() => moveTo(`/product/${product._id}`)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
