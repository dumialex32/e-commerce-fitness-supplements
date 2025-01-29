import { useState } from "react";
import Rating from "../../Rating";
import FormRow from "../../FormRow";
import { useCreateProductReviewMutation } from "../../../slices/productsApiSlice";
import { renderFetchBaseQueryError } from "../../../utils/errorHelpers";
import { createToast } from "../../../utils/toastUtils";
import { validateProductComment } from "../../../utils/formUtils/productFormUtils";
import ButtonLoader from "../../ButtonLoader";

const CreateProductReview: React.FC<{ productId: string }> = ({
  productId,
}) => {
  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [commentError, setCommentError] = useState<string>("");
  const [charsRemained, setCharsRemained] = useState<number>(250);
  const [createProductReview, { isLoading }] = useCreateProductReviewMutation();

  const isReviewValid = !commentError && comment.trim() !== "";

  const handleProductComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { maxLength, value: comment } = e.target;
    setCharsRemained(maxLength - comment.length);

    const error = validateProductComment(comment);
    setCommentError(error || "");
    setComment(comment);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isReviewValid) return;

    try {
      const res = await createProductReview({
        productId,
        comment,
        rating,
      }).unwrap();
      createToast(res.message || "Review successfully created", {
        type: "success",
      });
      setComment("");
      setCharsRemained(250);
      setRating(1);
    } catch (err: any) {
      createToast(
        renderFetchBaseQueryError(err) ||
          "Review failed to create. Please try again.",
        { type: "error" }
      );
    }
  };

  return (
    <form className="flex flex-col gap-2 border-t-2" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 mt-8">
        <h3>Rate this product:</h3>
        <Rating
          starNum={5}
          size="lg"
          interactive={true}
          onSetRating={setRating}
          value={rating}
        />
      </div>

      <div className="relative">
        <FormRow label="" error={commentError}>
          <textarea
            maxLength={250}
            value={comment}
            onChange={handleProductComment}
            placeholder="Write your review..."
          />
        </FormRow>
        <p className="absolute right-0 bottom-1/4 text-xs text-stone-600">
          {charsRemained} characters remaining
        </p>
      </div>

      <button
        type="submit"
        className={`btn btn-secondary self-start ${
          !isReviewValid && "opacity-50 cursor-not-allowed"
        }`}
        disabled={!isReviewValid || isLoading}
      >
        {isLoading ? <ButtonLoader text="Submitting review..." /> : "Submit"}
      </button>
    </form>
  );
};

export default CreateProductReview;
