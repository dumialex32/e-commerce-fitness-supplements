import ProductDetails from "../components/Product/ProductDetails";
import ProductDetailsCard from "../components/Product/ProductDetailsCard";
import NavigationButtons from "../components/NavigationButtons";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductReviews from "../components/Product/ProductReviews/ProductReviews";
import CreateProductReview from "../components/Product/ProductReviews/CreateProductReview";
import useProductScreen from "../hooks/useProductScreen";
import useErrorHandler from "../hooks/useErrorHandler";

const ProductScreen: React.FC = () => {
  const {
    product,
    isUserLoggedIn,
    productError,
    isLoading,
    hasUserPurchasedProduct,
    hasUserAlreadyReviewedProduct,
  } = useProductScreen();

  const errorMessage = useErrorHandler(productError);

  function renderReviewsSection() {
    if (product && product.reviews.length > 0) {
      return <ProductReviews reviews={product.reviews} />;
    }
    return (
      <Message type="info">This product has not been reviewed yet.</Message>
    );
  }

  function renderReviewForm() {
    if (!isUserLoggedIn || !hasUserPurchasedProduct) return null;
    if (product && !hasUserAlreadyReviewedProduct) {
      return <CreateProductReview productId={product._id} />;
    }
    return (
      <Message type="info">You have already reviewed this product.</Message>
    );
  }

  if (isLoading) return <Loader />;
  if (errorMessage) return <Message type="error">{errorMessage}</Message>;
  if (!product) return <Message type="info">No product</Message>;

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
