import Modal from "../Modal";
import ProductForm from "./ProductForm";

const CreateProduct: React.FC = () => {
  return (
    <Modal>
      <Modal.Open name="createProduct">
        <button className="btn btn-primary">Create product</button>
      </Modal.Open>

      <Modal.Window name="createProduct">
        <ProductForm />
      </Modal.Window>
    </Modal>
  );
};

export default CreateProduct;
