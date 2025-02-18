import { FaEdit } from "react-icons/fa";
import Modal from "../Modal";
import ProductForm from "./ProductForm";

import { Product } from "../../types/productsTypes/productTypes";

const EditProduct: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Modal>
      <Modal.Open name={product._id}>
        <button className="btn">
          <FaEdit />
        </button>
      </Modal.Open>

      <Modal.Window name={product._id}>
        <ProductForm isEdit={true} product={product} />
      </Modal.Window>
    </Modal>
  );
};

export default EditProduct;
