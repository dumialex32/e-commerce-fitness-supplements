export const getLocalStorageItem = <T>(name: string): T | null => {
  const item = localStorage.getItem(name);
  if (item) {
    return JSON.parse(item);
  } else {
    return null;
  }
};

export const setLocalStorageItem = <T>(name: string, item: T): void => {
  localStorage.setItem(name, JSON.stringify(item));
};
