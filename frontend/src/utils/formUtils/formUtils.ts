import { hasEmptyValue, hasEmptyValues } from "../utils";

export const checkFormInputs = (
  inputs: Record<string, any>,
  errors: Record<string, any>
): boolean => {
  if (hasEmptyValue(inputs) || !hasEmptyValue(errors)) {
    return true;
  }

  return false;
};
