import { useReducer } from "react";
import {
  useCreateProductMutation,
  useEditProductMutation,
  useUploadProductImageMutation,
} from "../slices/productsApiSlice";
import { createToast } from "../utils/toastUtils";
import { renderFetchBaseQueryError } from "../utils/errorHelpers";
import {
  validateProductBrand,
  validateProductCategory,
  validateProductCount,
  validateProductName,
  validateProductPrice,
} from "../utils/formUtils/productFormUtils";
import { Product } from "../types/productsTypes/productTypes";
import {
  ActionType,
  ProductFormField,
  ProductFormInitialState,
  IuseProductFormProps,
} from "../types/productsTypes/ProductFormTypes";
import { CreateEditProductPayload } from "../types/productsTypes/productSliceTypes";

const validationMap: Record<ProductFormField, (value: any) => string> = {
  name: validateProductName,
  price: validateProductPrice,
  countInStock: validateProductCount,
  category: validateProductCategory,
  brand: validateProductBrand,
  image: () => "",
  description: () => "",
};

const init = (product: Product) => ({
  name: product?.name || "",
  price: product?.price || 0,
  category: product?.category || "",
  brand: product?.brand || "",
  description: product?.description || "",
  countInStock: product?.countInStock || 0,
  image: product?.image || "",

  errors: {
    name: "",
    price: "",
    category: "",
    brand: "",
    countInStock: "",
    description: "",
    image: "",
  },
});

const reducer = (state: ProductFormInitialState, action: ActionType) => {
  switch (action.type) {
    case "SET_FIELD": {
      const { field, value } = action.payload;
      return { ...state, [field]: value };
    }

    case "REMOVE_PRODUCT_IMAGE":
      return { ...state, image: "" };

    case "SET_ERRORS":
      return { ...state, errors: { ...state.errors, ...action.payload } };

    default:
      return state;
  }
};

const useProductForm = ({
  product,
  isEdit,
  onCloseModal,
}: IuseProductFormProps) => {
  const productId = product?._id;

  const [state, dispatch] = useReducer(reducer, product, init);

  const productInputs = {
    name: state.name,
    price: state.price,
    category: state.category,
    brand: state.brand,
    description: state.description,
    countInStock: state.countInStock,
    image: state.image,
  };
  const errors = state.errors;

  const [editProduct, { isLoading: isLoadingEditProduct }] =
    useEditProductMutation();
  const [createProduct, { isLoading: isLoadingCreateProduct }] =
    useCreateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadProductImage(formData).unwrap();

      removeProductImage();
      setProductFormField("image", res.imagePath);

      return res;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let productImage = productInputs.image;

      if (productImage instanceof File) {
        const res = await uploadImage(productImage);
        productImage = res.imagePath;
      }

      const patch: CreateEditProductPayload = {
        ...productInputs,
        image: productImage,
      };

      let res;

      isEdit
        ? (res = await editProduct({ productId, patch }).unwrap())
        : (res = await createProduct(patch).unwrap());

      createToast(`Product successfully ${isEdit ? "updated" : "created"}`, {
        type: "success",
      });
      onCloseModal();
    } catch (err: any) {
      console.error(err);
      createToast(
        renderFetchBaseQueryError(err) ||
          `Product ${isEdit ? "edit" : "creation"} failed. Please try again`,
        { type: "error" }
      );
    }
  };

  const setProductFormField = (
    field: ProductFormField,
    value: string | number | File | null
  ) => {
    const validate = validationMap[field];
    const errorMessage = validate ? validate(value) : "";

    dispatch({ type: "SET_FIELD", payload: { field, value } });
    dispatch({ type: "SET_ERRORS", payload: { [field]: errorMessage } });
  };

  const removeProductImage = () => {
    dispatch({ type: "REMOVE_PRODUCT_IMAGE" });
  };

  return {
    setProductFormField,
    removeProductImage,
    handleFormSubmit,
    productInputs,
    errors,
    isLoadingCreateProduct,
    isLoadingEditProduct,
  };
};
export default useProductForm;
