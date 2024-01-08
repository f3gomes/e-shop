export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem, removeItem };
};

