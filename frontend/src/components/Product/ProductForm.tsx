import FormRow from "../FormRow";
import useProductForm from "../../hooks/useProductForm";
import Loader from "../Loader";
import { hasEmptyValues } from "../../utils/utils";
import { IProduct } from "../../types/productsTypes/productTypes";

const ProductForm: React.FC<{
  isEdit: boolean;
  product?: IProduct;
}> = ({ isEdit = false, product }) => {
  const {
    name,
    price,
    category,
    brand,
    countInStock,
    description,
    isLoadingCreateProduct,
    isLoadingEditProduct,
    errors,
    setProductName,
    setProductPrice,
    setProductCategory,
    setProductBrand,
    setProductDescription,
    setProductCount,
    handleFormSubmit,
  } = useProductForm(product, isEdit);

  if (isLoadingCreateProduct || isLoadingEditProduct) {
    return <Loader />;
  }

  return (
    <>
      <h2 className="text-2xl text-primary">
        {isEdit ? "Edit" : "Create"} Product
      </h2>
      <form className="p-4" onSubmit={handleFormSubmit}>
        <FormRow label="Name" error={errors?.name || ""}>
          <input
            type="text"
            value={name}
            id="name"
            onChange={(e) => setProductName(e.target.value)}
          />
        </FormRow>
        <FormRow label="Price" error={errors?.price || ""}>
          <input
            type="number"
            value={price}
            id="price"
            onChange={(e) => setProductPrice(Number(e.target.value))}
          />
        </FormRow>
        <FormRow label="Category" error={errors?.category || ""}>
          <input
            type="category"
            value={category}
            id="category"
            onChange={(e) => setProductCategory(e.target.value)}
          />
        </FormRow>
        <FormRow label="Brand" error={errors?.brand || ""}>
          <input
            type="text"
            value={brand}
            id="brand"
            onChange={(e) => setProductBrand(e.target.value)}
          />
        </FormRow>

        <FormRow label="Description" error={errors?.description || ""}>
          <textarea
            value={description}
            id="description"
            onChange={(e) => setProductDescription(e.target.value)}
          >
            {description}
          </textarea>
        </FormRow>
        <FormRow label="Count" error={errors?.countInStock || ""}>
          <input
            type="number"
            value={countInStock}
            id="count"
            onChange={(e) => setProductCount(Number(e.target.value))}
          />
        </FormRow>
        <FormRow label="Image" error={errors?.image || ""}>
          <input type="file" />
        </FormRow>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={!hasEmptyValues(errors)}
        >
          {isEdit ? "Edit" : "Create"}
        </button>
      </form>
    </>
  );
};

export default ProductForm;
