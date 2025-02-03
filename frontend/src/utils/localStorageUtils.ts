// local storage helpers
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

// local storage pagination settings helpers
export const getLocalStoragePaginationSettings = (): Record<string, any> => {
  const item = getLocalStorageItem("paginationSettings");
  if (item) {
    return item;
  } else {
    return {};
  }
};

export const setLocalStoragePaginationSettings = (key: string, value: any) => {
  const settings = getLocalStoragePaginationSettings();
  settings[key] = value;
  setLocalStorageItem("paginationSettings", settings);
};
