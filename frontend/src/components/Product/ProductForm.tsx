import FormRow from "../FormRow";
import useProductForm from "../../hooks/useProductForm";
import Loader from "../Loader";
import { IProduct } from "../../types/productsTypes/productTypes";
import UploadFile from "../UploadFile";
import { checkFormInputs } from "../../utils/formUtils/formUtils";
import { useRef } from "react";

const ProductForm: React.FC<{
  isEdit?: boolean;
  product?: IProduct;
}> = ({ isEdit = false, product }) => {
  const addProductImageRef = useRef<HTMLInputElement | null>(null);

  const {
    productInputs,
    errors,
    isLoadingCreateProduct,
    isLoadingEditProduct,
    setProductName,
    setProductPrice,
    setProductCategory,
    setProductBrand,
    setProductDescription,
    setProductCount,
    setProductImage,
    handleFormSubmit,
    removeProductImage,
    upImg,
  } = useProductForm(product, isEdit);

  if (isLoadingCreateProduct || isLoadingEditProduct) {
    return <Loader />;
  }

  const isFormInvalid = checkFormInputs(productInputs, errors);

  return (
    <>
      <h2 className="text-2xl text-primary">
        {isEdit ? "Edit" : "Create"} Product
      </h2>
      <form className="p-4" onSubmit={handleFormSubmit}>
        <FormRow label="Name" error={errors?.name || ""}>
          <input
            type="text"
            value={productInputs.name}
            id="name"
            onChange={(e) => setProductName(e.target.value)}
          />
        </FormRow>
        <FormRow label="Price" error={errors?.price || ""}>
          <input
            type="number"
            value={productInputs.price}
            id="price"
            onChange={(e) => setProductPrice(Number(e.target.value))}
          />
        </FormRow>
        <FormRow label="Category" error={errors?.category || ""}>
          <input
            type="category"
            value={productInputs.category}
            id="category"
            onChange={(e) => setProductCategory(e.target.value)}
          />
        </FormRow>
        <FormRow label="Brand" error={errors?.brand || ""}>
          <input
            type="text"
            value={productInputs.brand}
            id="brand"
            onChange={(e) => setProductBrand(e.target.value)}
          />
        </FormRow>

        <FormRow label="Description" error={errors?.description || ""}>
          <textarea
            value={productInputs.description}
            id="description"
            onChange={(e) => setProductDescription(e.target.value)}
          >
            {productInputs.description}
          </textarea>
        </FormRow>
        <FormRow label="Count" error={errors?.countInStock || ""}>
          <input
            type="number"
            value={productInputs.countInStock}
            id="count"
            onChange={(e) => setProductCount(Number(e.target.value))}
          />
        </FormRow>
        {isEdit && (
          <FormRow label="Image">
            <input type="text" defaultValue={productInputs.image} />
          </FormRow>
        )}
        <FormRow label={!isEdit ? "Image " : ""} error={errors?.image || ""}>
          <UploadFile
            id="image"
            onChange={(e) => setProductImage(e.target.files[0])}
            removeFile={removeProductImage}
            ref={addProductImageRef}
            file={productInputs.image}
          />
        </FormRow>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={isFormInvalid}
        >
          {isEdit ? "Edit" : "Create"}
        </button>
      </form>
    </>
  );
};

export default ProductForm;
