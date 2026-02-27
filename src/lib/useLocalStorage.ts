import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) setValue(JSON.parse(stored));
    } catch {}
  }, [key]);

  const set = (newVal: T) => {
    setValue(newVal);
    try {
      localStorage.setItem(key, JSON.stringify(newVal));
    } catch {}
  };

  return [value, set] as const;
}