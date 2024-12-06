import { FaEdit } from "react-icons/fa";

const handleEditProduct = () => {
  // to do
};

const EditProduct: React.FC = () => {
  return (
    <button className="btn" onClick={handleEditProduct}>
      <FaEdit />
    </button>
  );
};

export default EditProduct;
