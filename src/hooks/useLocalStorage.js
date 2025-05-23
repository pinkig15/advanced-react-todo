import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Initialize state with value from localStorage or fallback to initialValue
  const [value, setValue] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key:', key, error);
      return initialValue;
    }
  });

  // Update localStorage whenever 'value' changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting localStorage key:', key, error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
