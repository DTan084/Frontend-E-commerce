const canUseStorage = () => typeof window !== 'undefined' && !!window.localStorage;

const getItem = (key, fallbackValue = null) => {
  if (!canUseStorage()) return fallbackValue;

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue === null ? fallbackValue : JSON.parse(rawValue);
  } catch (error) {
    console.error(`Error reading storage key "${key}":`, error);
    return fallbackValue;
  }
};

const setItem = (key, value) => {
  if (!canUseStorage()) return false;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing storage key "${key}":`, error);
    return false;
  }
};

const removeItem = (key) => {
  if (!canUseStorage()) return false;

  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing storage key "${key}":`, error);
    return false;
  }
};

export const storageService = {
  canUseStorage,
  getItem,
  setItem,
  removeItem,
};

export default storageService;
