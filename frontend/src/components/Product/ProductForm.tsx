import FormRow from "../FormRow";
import useProductForm from "../../hooks/useProductForm";
import { Product } from "../../types/productsTypes/productTypes";
import UploadFile from "../UploadFile";
import { checkFormInputs } from "../../utils/formUtils/formUtils";
import { useRef } from "react";
import ButtonLoader from "../ButtonLoader";
import { ProductFormField } from "../../types/productsTypes/ProductFormTypes";

const ProductForm: React.FC<{
  isEdit?: boolean;
  product: Product;
  onCloseModal: () => void;
}> = ({ isEdit = false, product, onCloseModal }) => {
  const addProductImageRef = useRef<HTMLInputElement | null>(null);

  const {
    productInputs,
    errors,
    isLoadingCreateProduct,
    isLoadingEditProduct,
    setProductFormField,
    handleFormSubmit,
    removeProductImage,
  } = useProductForm({ product, isEdit, onCloseModal });

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
            onChange={(e) =>
              setProductFormField(
                e.target.id as ProductFormField,
                e.target.value
              )
            }
          />
        </FormRow>
        <FormRow label="Price" error={errors?.price || ""}>
          <input
            type="number"
            value={productInputs.price}
            id="price"
            onChange={(e) =>
              setProductFormField(
                e.target.id as ProductFormField,
                e.target.value
              )
            }
          />
        </FormRow>
        <FormRow label="Category" error={errors?.category || ""}>
          <input
            type="category"
            value={productInputs.category}
            id="category"
            onChange={(e) =>
              setProductFormField(
                e.target.id as ProductFormField,
                Number(e.target.value)
              )
            }
          />
        </FormRow>
        <FormRow label="Brand" error={errors?.brand || ""}>
          <input
            type="text"
            value={productInputs.brand}
            id="brand"
            onChange={(e) =>
              setProductFormField(
                e.target.id as ProductFormField,
                e.target.value
              )
            }
          />
        </FormRow>

        <FormRow label="Description" error={errors?.description || ""}>
          <textarea
            value={productInputs.description}
            id="description"
            onChange={(e) =>
              setProductFormField(
                e.target.id as ProductFormField,
                e.target.value
              )
            }
          >
            {productInputs.description}
          </textarea>
        </FormRow>
        <FormRow label="Count" error={errors?.countInStock || ""}>
          <input
            type="number"
            value={productInputs.countInStock}
            id="count"
            onChange={(e) =>
              setProductFormField(
                e.target.id as ProductFormField,
                Number(e.target.value)
              )
            }
          />
        </FormRow>
        {isEdit && (
          <FormRow label="Image">
            <input
              type="text"
              defaultValue={productInputs.image.toString() || ""}
            />
          </FormRow>
        )}
        <FormRow label={!isEdit ? "Image " : ""} error={errors?.image || ""}>
          <UploadFile
            id="image"
            accept="image"
            onChange={setProductFormField}
            removeFile={removeProductImage}
            ref={addProductImageRef}
          />
        </FormRow>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={isFormInvalid}
        >
          {isLoadingCreateProduct || isLoadingEditProduct ? (
            <ButtonLoader
              text={isEdit ? "Updating Product..." : "Creating Product"}
            />
          ) : isEdit ? (
            "Update product"
          ) : (
            "Create Product"
          )}
        </button>
      </form>
    </>
  );
};

export default ProductForm;
