import { useState, useEffect } from "react";

export default function useLocalStorageState(key: string, initialize: any) {
  const [value, setValue] = useState<any>(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialize;
  });

  useEffect(() => {
    console.log("Setlocal");
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  const setLocalStorage = (valueStore: any) => {
    console.log("valueStore:::", valueStore);
    setValue(valueStore);
  };

  return { value, setLocalStorage };
}
