import Product from "../components/Product/ProductCard";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { IuseGetProductsQuery } from "../types/productsTypes/productQueryTypes";
import { renderFetchBaseQueryError } from "../utils/errorHelpers";
import Message from "../components/Message";
import Loader from "../components/Loader";

const HomeScreen: React.FC = () => {
  const {
    data: products,
    isLoading,
    error,
  }: IuseGetProductsQuery = useGetProductsQuery();

  if (isLoading) return <Loader size="xl" />;

  if (error)
    return <Message type="error">{renderFetchBaseQueryError(error)}</Message>;

  if (!products || products.length === 0)
    return <Message type="info">No products has been found.</Message>;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">Latest Products</h1>
      <ul className="flex flex-wrap">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default HomeScreen;
