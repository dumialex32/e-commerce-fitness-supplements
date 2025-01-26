import { FaEdit } from "react-icons/fa";
import Modal from "../Modal";
import ProductForm from "./ProductForm";

import { IProduct } from "../../types/productsTypes/productTypes";

const EditProduct: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Modal>
      <Modal.Open name={product._id}>
        <button className="btn">
          <FaEdit />
        </button>
      </Modal.Open>

      <Modal.Window name={product._id}>
        <ProductForm isEdit={true} product={product} onCloseModal />
      </Modal.Window>
    </Modal>
  );
};

export default EditProduct;
