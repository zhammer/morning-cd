import { useState, useEffect } from 'react';

/**
 * Hook to check if state has remained the same for a given period of time.
 * @param initialState Initial state.
 * @param msUntilConfident Milliseconds after which state is considered confident if state is the same.
 */
export default function useConfidentState<T>(initialState: T | null, msUntilConfident: number) {
  const [value, setValue] = useState<T | null>(initialState);
  const [checkValue, setCheckValue] = useState<T | null>(initialState);
  const [confident, setConfident] = useState<boolean>(true);

  useEffect(() => {
    if (value === checkValue) {
      setConfident(true);
    }
  }, [checkValue]);

  function handleValueChanged(newValue: T) {
    setValue(newValue);
    setConfident(false);
    setTimeout(() => setCheckValue(newValue), msUntilConfident);
  }

  return [value, confident, handleValueChanged];
}