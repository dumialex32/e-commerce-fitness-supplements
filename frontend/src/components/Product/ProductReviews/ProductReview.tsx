import { IProductReviewProps } from "../../../types/productsTypes/productTypes";
import { formatDate } from "../../../utils/formatters";
import Rating from "../../Rating";
import { FaUser } from "react-icons/fa";

const ProductReview: React.FC<IProductReviewProps> = ({ review }) => {
  return (
    <li className="p-2 flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <h3 className="text-l flex items-center gap-2">
          <FaUser />
          {review.name}
        </h3>
        <p className="text-xs">Reviewed on {formatDate(review.createdAt)} </p>

        <Rating value={review.rating} starNum={5} size="xs" />
      </div>

      <p className="text-sm">{review.comment}</p>
    </li>
  );
};

export default ProductReview;
