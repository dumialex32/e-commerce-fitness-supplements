import { every, isEmpty } from "lodash";

// checks if all properties of the object are either empty or contain an empty string
export const hasEmptyValues = (obj: Record<string, any>): boolean => {
  return every(obj, (value) => isEmpty(value) || value === "");
};

export const checkFormInputs = (
  inputs: Record<string, any>,
  errors: Record<string, any>
): boolean => {
  for (const key in inputs) {
    if (isEmpty(inputs[key]) || !isEmpty(errors[key])) {
      return true;
    }
  }
  return false;
};
