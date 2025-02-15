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
    } catch (err: any) {
      console.error(err);
      createToast(
        renderFetchBaseQueryError(err) ||
          "A problem occured while deleting this product. Please try again.",
        { type: "error" }
      );
    }
  };

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
          onCloseModal
          resource="product"
          resourceName={productId}
          action="delete"
        />
      </Modal.Window>
    </Modal>
  );
};

export default RemoveProduct;
