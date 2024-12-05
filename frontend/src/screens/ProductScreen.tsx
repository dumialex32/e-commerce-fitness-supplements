import { useProduct } from "../hooks/useProduct";
import ProductDetails from "../components/Product/ProductDetails";
import ProductDetailsCard from "../components/Product/ProductDetailsCard";
import NavigationButtons from "../components/NavigationButtons";
import Loader from "../components/Loader";
import { renderFetchBaseQueryError } from "../utils/errorHelpers";
import Message from "../components/Message";

const ProductScreen: React.FC = () => {
  const { product, isLoading, error } = useProduct();

  if (isLoading) return <Loader />;

  if (error)
    return <Message type="error">{renderFetchBaseQueryError(error)}</Message>;

  return (
    <>
      <NavigationButtons>
        <NavigationButtons.NavigateBack />
        <NavigationButtons.NavigateTo to="cart">
          Go to cart
        </NavigationButtons.NavigateTo>
      </NavigationButtons>

      <div className="w-cm-64 mx-auto">
        <div className="grid grid-cols-[auto_1fr_1fr] gap-6">
          <div>
            <img src={product.image} className="h-96" alt={product.name} />
          </div>

          <ProductDetails product={product} />

          <ProductDetailsCard product={product} />
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
