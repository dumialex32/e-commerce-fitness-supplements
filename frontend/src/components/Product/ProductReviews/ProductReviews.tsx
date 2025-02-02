import { ProductReviewsProps } from "../../../types/productsTypes/productTypes";
import ProductReview from "./ProductReview";

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {
  return (
    <div className="flex flex-col gap-4 h-80 border-b-2">
      <h2 className="text-2xl font-semibold ">Product reviews</h2>

      <ul className="overflow-y-auto p-2 h-full">
        {reviews.map((review) => {
          return <ProductReview key={review.user} review={review} />;
        })}
      </ul>
    </div>
  );
};

export default ProductReviews;
