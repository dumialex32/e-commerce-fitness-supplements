import ProductDetails from "../components/Product/ProductDetails";
import ProductDetailsCard from "../components/Product/ProductDetailsCard";
import NavigationButtons from "../components/NavigationButtons";
import Loader from "../components/Loader";
import { renderFetchBaseQueryError } from "../utils/errorHelpers";
import Message from "../components/Message";
import ProductReviews from "../components/Product/ProductReviews/ProductReviews";
import CreateProductReview from "../components/Product/ProductReviews/CreateProductReview";
import { DEFAULT_ERROR_MESSAGE } from "../constants";
import useProductScreen from "../hooks/useProductScreen";

const ProductScreen: React.FC = () => {
  const {
    product,
    isUserLoggedIn,
    productError,

    isLoading,
    hasUserPurchasedProduct,
    hasUserAlreadyReviewedProduct,
  } = useProductScreen();

  function renderReviewsSection() {
    if (product.reviews.length > 0) {
      return <ProductReviews reviews={product.reviews} />;
    }
    return (
      <Message type="info">This product has not been reviewed yet.</Message>
    );
  }

  function renderReviewForm() {
    if (!isUserLoggedIn || !hasUserPurchasedProduct) return null;
    if (!hasUserAlreadyReviewedProduct) {
      return <CreateProductReview productId={product._id} />;
    }
    return (
      <Message type="info">You have already reviewed this product.</Message>
    );
  }

  if (isLoading) return <Loader />;

  if (productError) {
    return (
      <Message type="error">
        {renderFetchBaseQueryError(productError) || DEFAULT_ERROR_MESSAGE}
      </Message>
    );
  }

  return (
    <>
      <NavigationButtons>
        <NavigationButtons.NavigateBack />
        <NavigationButtons.NavigateTo to="cart">
          Go to cart
        </NavigationButtons.NavigateTo>
      </NavigationButtons>

      <div className="w-cm-64 mx-auto flex flex-col gap-8">
        <div className="grid grid-cols-[auto_1fr_1fr] gap-6">
          <div>
            <img src={product.image} className="h-96" alt={product.name} />
          </div>
          <ProductDetails product={product} />
          <ProductDetailsCard product={product} />
        </div>

        {renderReviewsSection()}
        {renderReviewForm()}
      </div>
    </>
  );
};

export default ProductScreen;
