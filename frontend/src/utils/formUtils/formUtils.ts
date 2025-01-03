import { hasEmptyValue, hasEmptyValues } from "../utils";

export const checkFormInputs = (
  inputs: Record<string, any>,
  errors: Record<string, any>
): boolean => {
  if (hasEmptyValue(inputs) || !hasEmptyValues(errors)) {
    return true;
  }

  return false;
};
