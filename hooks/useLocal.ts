export const useLocalStorage = () => {
  const setItem = (key: string, value: unknown) => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = (key: string) => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = (key: string) => {
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
