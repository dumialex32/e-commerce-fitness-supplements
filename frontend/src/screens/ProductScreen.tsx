import { useNavigate, useParams } from "react-router-dom";
import products, { ProductType } from "../products";
import Rating from "../components/Rating";
import { formatPrice } from "../helpers/helpers";

const ProductScreen: React.FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product: ProductType | undefined = products.find(
    (p) => p.id === params.id
  );

  type StockStatus = {
    text: string;
    color: string;
  };

  const getItemStockInfo = (counterInStock: number): StockStatus => {
    if (counterInStock === 0) {
      return { text: "Sold Out", color: "text-red-400" };
    }
    if (counterInStock > 0 && counterInStock <= 9) {
      return {
        text: `Only ${counterInStock} remained`,
        color: "text-blue-400",
      };
    }

    return { text: "In Stock", color: "text-green-400" };
  };

  if (!product) throw new Error("No product to be fetched");

  return (
    <>
      <button className="btn btn-sm mb-8" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="w-cm-64 mx-auto">
        <div className="grid grid-cols-[auto_1fr_1fr] gap-6">
          <div>
            <img src={product.image} className="h-96" />
          </div>

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
              Price: {formatPrice(product.price)}
            </p>

            <div className="divider"></div>
            <p className="text-sm px-3">{product.description}</p>
          </div>

          <div className="card bg-base-100 border-2 max-h-44">
            <div className="card-body divide-y-2">
              <h2 className="card-title">
                Price: <span>{formatPrice(product.price)}</span>
              </h2>
              <p>
                <span className="text-gray-400">Status: </span>
                <span
                  className={`${
                    getItemStockInfo(product.countInStock).color
                  } font-semibold`}
                >
                  {getItemStockInfo(product.countInStock).text}
                </span>
              </p>

              <button
                className="btn btn-primary"
                disabled={product.countInStock === 0}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
