import { useState, useCallback } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
    } catch {
      // corrupted data — fall through to default
    }
    return typeof initialValue === "function"
      ? initialValue()
      : initialValue;
  });

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const nextValue =
          typeof value === "function" ? value(prev) : value;
        try {
          localStorage.setItem(key, JSON.stringify(nextValue));
        } catch {
          // storage full or unavailable — silently degrade
        }
        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
