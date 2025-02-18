import { FaTrash } from "react-icons/fa";
import { useDeleteProductMutation } from "../../slices/productsApiSlice";
import { createToast } from "../../utils/toastUtils";
import { renderFetchBaseQueryError } from "../../utils/errorHelpers";
import Loader from "../Loader";
import Modal from "../Modal";
import Confirm from "../Confirm";

const RemoveProduct: React.FC<{ productId: string }> = ({ productId }) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleRemoveProduct = async () => {
    try {
      const res = await deleteProduct(productId).unwrap();

      createToast(res.message || "Product successfully deleted", {
        type: "success",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      createToast(
        renderFetchBaseQueryError(err) ||
          "A problem occured while deleting this product. Please try again.",
        { type: "error" }
      );
    }
  };
  // to do on closemodal
  return (
    <Modal>
      <Modal.Open name={productId}>
        <button className="btn">
          {isLoading && <Loader />}
          <FaTrash color="red" />
        </button>
      </Modal.Open>

      <Modal.Window name={productId}>
        <Confirm
          onConfirm={handleRemoveProduct}
          resource="product"
          resourceName={productId}
          action="delete"
        />
      </Modal.Window>
    </Modal>
  );
};

export default RemoveProduct;
