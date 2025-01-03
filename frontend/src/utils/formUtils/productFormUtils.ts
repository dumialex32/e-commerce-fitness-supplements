const isNumberInt = (input: number | string, inputName: string) => {
  const regex = /^\d+$/;

  if (!input.toString().match(regex)) {
    return `The ${inputName} must contain only numbers`;
  }

  return "";
};

const isNumberDec = (input: number | string, inputName: string) => {
  const regex = /^\d+(\.\d+)?$/;

  if (!input.toString().match(regex)) {
    return `The ${inputName} must contain only whole numbers or decimals`;
  }

  return "";
};

const validateProduct = (productInput: string, inputName: string) => {
  const minLength = 2;
  const maxLength = 24;

  if (productInput.length > maxLength) {
    return `Product ${inputName} is too long`;
  }
  if (productInput.length < minLength) {
    return `Product ${inputName} is too short`;
  }

  return "";
};

export const validateProductName = (name: string) => {
  return validateProduct(name, "name");
};

export const validateProductPrice = (price: number) => {
  return isNumberDec(price, "price");
};

export const validateProductCategory = (category: string) => {
  return validateProduct(category, "category");
};

export const validateProductBrand = (brand: string) => {
  return validateProduct(brand, "brand");
};

export const validateProductCount = (productCount: number) => {
  return isNumberInt(productCount, "count");
};
