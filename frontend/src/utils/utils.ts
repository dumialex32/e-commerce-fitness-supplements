// checks if properties within obj are empty
const isEmptyVal = (val) => {
  if (val === "" || val === undefined || val === null) {
    return true;
  }

  return false;
};

export const hasEmptyValue = (obj: unknown): boolean => {
  if (Array.isArray(obj)) {
    return obj.some((val) => hasEmptyValue(val));
  }

  if (typeof obj === "object" && obj !== null) {
    return Object.values(obj).some((val) => hasEmptyValue(val));
  }

  return isEmptyVal(obj);
};

export const hasEmptyValues = (obj: unknown): boolean => {
  if (Array.isArray(obj)) {
    return obj.every((val) => hasEmptyValues(val));
  }
  if (typeof obj === "object" && obj !== null) {
    return Object.values(obj).every((val) => hasEmptyValues(val));
  }

  return isEmptyVal(obj);
};
