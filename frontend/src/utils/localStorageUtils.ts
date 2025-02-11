// local storage helpers
export const getLocalStorageItem = <T>(name: string): T | null => {
  const item = localStorage.getItem(name);

  return item ? JSON.parse(item) : null;
};

export const setLocalStorageItem = <T>(name: string, item: T): void => {
  localStorage.setItem(name, JSON.stringify(item));
};

// local storage pagination settings helpers
export const getLocalStoragePaginationSettings = (): Record<string, any> => {
  const item = getLocalStorageItem("paginationSettings");
  return item ? item : {};
};

export const setLocalStoragePaginationSettings = (key: string, value: any) => {
  const settings = getLocalStoragePaginationSettings();
  settings[key] = value;
  setLocalStorageItem("paginationSettings", settings);
};

export const getLocalStoragePaginationSetting = (key: string) => {
  const paginationItem = getLocalStoragePaginationSettings()[key];

  return paginationItem ? paginationItem : {};
};
