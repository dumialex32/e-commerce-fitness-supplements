import { ProductType } from "../products";
import { formatPrice } from "../helpers/helpers";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }: { product: ProductType }) => {
  return (
    <li className="w-full md:w-1/2 lg:w-1/6 p-2">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <Link to={`product/${product.id}`}>
            <img src={product.image} alt={product.name} />
          </Link>
        </figure>
        <div className="card-body min-h-80 ">
          <h2 className="card-title">{product.name}</h2>
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {product.description}
          </p>
          <p className="text-xl font-bold">{formatPrice(product.price)}</p>
          <Rating
            value={product.rating}
            reviews={product.numReviews}
            starNum={5}
            direction="vertical"
          />
          <div className="card-actions justify-start">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Product;
