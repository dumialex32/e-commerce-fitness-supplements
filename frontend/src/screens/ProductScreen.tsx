import Loading from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { renderFetchBaseQueryError } from "../utils/errorHelpers";
import { formatPriceCurrency } from "../utils/formatters";
import { getItemStockInfo } from "../utils/productUtils";
import useCart from "../hooks/useCart";
import { useProduct } from "../hooks/useProduct";
import useAppNavigate from "../hooks/useNavigate";
import ProductQty from "../components/ProductQty";

const ProductScreen: React.FC = () => {
  const { product, isLoading, error } = useProduct();
  const { handleAddToCart } = useCart();
  const { moveBack } = useAppNavigate();

  return (
    <>
      <button className="btn btn-sm mb-8" onClick={moveBack}>
        Back
      </button>
      {isLoading ? (
        <Loading size="lg" />
      ) : renderFetchBaseQueryError(error) ? (
        <Message type="error">{renderFetchBaseQueryError(error)}</Message>
      ) : (
        <div className="w-cm-64 mx-auto">
          <div className="grid grid-cols-[auto_1fr_1fr] gap-6">
            <div>
              <img src={product.image} className="h-96" alt={product.name} />
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
                Price: {formatPriceCurrency(product.price)}
              </p>
              <div className="divider"></div>
              <p className="text-sm px-3">{product.description}</p>
            </div>
            <div className="card bg-base-100 border-2">
              <div className="card-body divide-y-2">
                <h2 className="card-title">
                  Price: <span>{formatPriceCurrency(product.price)}</span>
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
                {product.countInStock > 0 && <ProductQty product={product} />}

                <button
                  className="btn btn-primary"
                  disabled={product.countInStock === 0}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
