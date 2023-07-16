import { useState, useEffect } from "react";

export default function useLocalStorageState(initialize: any, key: string) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialize;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  return [value, setValue];
}
