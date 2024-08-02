import { useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { formatPriceCurrency } from "../utils/formatters";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { IuseGetProductDetailsQuery } from "../types/products/productQueryTypes";
import { renderFetchBaseQueryError } from "../utils/errorHelpers";
import Loading from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { MAX_ORDER_PER_ITEM } from "../constants";
import { addToCart } from "../slices/cartSlice";
import { ICartItem } from "../types/cart/cartItemTypes";
import { useDispatch } from "react-redux";

const ProductScreen: React.FC = () => {
  const { id: productId } = useParams() as { id: string };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState<number>(1);

  const {
    data: product,
    isLoading,
    error,
  }: IuseGetProductDetailsQuery = useGetProductDetailsQuery(productId);

  const getItemStockInfo = (counterInStock: number) => {
    if (counterInStock === 0) {
      return { text: "Sold Out", color: "text-red-400" };
    }
    if (counterInStock > 0 && counterInStock <= 9) {
      return {
        text: `Only ${counterInStock} left`,
        color: "text-blue-400",
      };
    }

    return { text: "In Stock", color: "text-green-400" };
  };

  const handleSelectQty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQty(parseInt(e.target.value));
  };

  const handleAddToCart = (): void => {
    const cartItem: ICartItem = { ...product, qty: qty };

    dispatch(addToCart(cartItem));
    navigate("/cart");
  };

  return (
    <>
      <button className="btn btn-sm mb-8" onClick={() => navigate(-1)}>
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
                {product.countInStock > 0 && (
                  <div className="relative py-2.5">
                    <div className="border border-gray-300 rounded-md px-3 py-2">
                      <span>Quantity: {qty}</span>
                      <select
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        value={qty}
                        onChange={handleSelectQty}
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
                  </div>
                )}

                <button
                  className="btn btn-primary"
                  disabled={product.countInStock === 0}
                  onClick={handleAddToCart}
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
