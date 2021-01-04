export const getStorageItem = (name: string): string | null => {
  const storageValue = window.localStorage.getItem(name);
  return storageValue ? JSON.parse(storageValue) : null;
}

export const setStorageItem = (name: string, value: string): void =>
  window.localStorage.setItem(name, JSON.stringify(value));

export const deleteStorageItem = (name: string): void => window.localStorage.removeItem(name);

export const isUserLoggedIn = (): boolean => !!getStorageItem('token');
