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
import { IProduct, IProductPayload } from "../types/productsTypes/productTypes";

const init = (product: IProduct) => ({
  name: product?.name || "",
  price: product?.price || "",
  category: product?.category || "",
  brand: product?.brand || "",
  description: product?.description || "",
  countInStock: product?.countInStock || "",
  image: product?.image || null,

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

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCT_NAME":
      return { ...state, name: action.payload };
    case "SET_PRODUCT_PRICE":
      return {
        ...state,
        price: action.payload,
      };

    case "SET_PRODUCT_CATEGORY":
      return { ...state, category: action.payload };

    case "SET_PRODUCT_BRAND":
      return { ...state, brand: action.payload };

    case "SET_PRODUCT_COUNT":
      return { ...state, countInStock: action.payload };

    case "SET_PRODUCT_DESCRIPTION":
      return { ...state, description: action.payload };

    case "SET_PRODUCT_IMAGE":
      return { ...state, image: action.payload };

    case "REMOVE_PRODUCT_IMAGE":
      return { ...state, image: null };

    case "SET_ERRORS":
      return { ...state, errors: { ...state.errors, ...action.payload } };

    default:
      return state;
  }
};

const useProductForm = (product: IProduct, isEdit: boolean) => {
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
  const [uploadProductImage, { isLoading: isLoadingUploadProductImage }] =
    useUploadProductImageMutation();

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadProductImage(formData).unwrap();

      removeProductImage();
      setProductImage(res.imagePath);

      return res;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  const handleFormSubmit = async () => {
    try {
      let productImage = productInputs.image;

      if (productImage instanceof File) {
        const res = await uploadImage(productImage);
        productImage = res.imagePath;
      }

      const patch: IProductPayload = {
        ...productInputs,
        image: productImage,
      };

      let res;

      isEdit
        ? (res = await editProduct({ productId, patch }))
        : (res = await createProduct(patch));

      createToast(`Product successfully ${isEdit ? "updated" : "created"}`, {
        type: "success",
      });
    } catch (err: any) {
      console.error(err);
      createToast(
        renderFetchBaseQueryError(err) ||
          `Product ${isEdit ? "edit" : "creation"} failed. Please try again`,
        { type: "error" }
      );
    }
  };

  const setProductName = (productName: string) => {
    const validatedProductName = validateProductName(productName);
    dispatch({ type: "SET_PRODUCT_NAME", payload: productName });
    dispatch({ type: "SET_ERRORS", payload: { name: validatedProductName } });
  };

  const setProductPrice = (productPrice: number) => {
    const validatedProductPrice = validateProductPrice(productPrice);
    dispatch({ type: "SET_PRODUCT_PRICE", payload: productPrice });
    dispatch({ type: "SET_ERRORS", payload: { price: validatedProductPrice } });
  };

  const setProductCategory = (productCategory: string) => {
    const validatedProductCategory = validateProductCategory(productCategory);
    dispatch({ type: "SET_PRODUCT_CATEGORY", payload: productCategory });
    dispatch({
      type: "SET_ERRORS",
      payload: { category: validatedProductCategory },
    });
  };

  const setProductBrand = (productBrand: string) => {
    const validatedProductBrand = validateProductBrand(productBrand);
    dispatch({ type: "SET_PRODUCT_BRAND", payload: productBrand });
    dispatch({ type: "SET_ERRORS", payload: { brand: validatedProductBrand } });
  };

  const setProductDescription = (productDescription: string) => {
    dispatch({ type: "SET_PRODUCT_DESCRIPTION", payload: productDescription });
  };

  const setProductCount = (productCount: number) => {
    const validatedProductCount = validateProductCount(productCount);
    dispatch({ type: "SET_PRODUCT_COUNT", payload: productCount });
    dispatch({ type: "SET_ERRORS", payload: validatedProductCount });
  };

  // handle image upload
  const setProductImage = (file: File | string) => {
    dispatch({
      type: "SET_PRODUCT_IMAGE",
      payload: file,
    });
  };

  const removeProductImage = () => {
    dispatch({ type: "REMOVE_PRODUCT_IMAGE" });
  };

  return {
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
    removeProductImage,
    handleFormSubmit,
  };
};

export default useProductForm;
