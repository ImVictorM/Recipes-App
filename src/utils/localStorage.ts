export const setInLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = <T>(key: string): T | undefined => {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item) as T;
  }
};

export const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
