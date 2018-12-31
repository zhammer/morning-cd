import { useState, useEffect } from 'react';

/**
 * Hook to check if state has remained the same for a given period of time.
 * @param initialState Initial state.
 * @param msUntilConfident Milliseconds after which state is considered confident if state is the same.
 */
export default function useConfidentState<T>(initialState: T, msUntilConfident: number): UseConfidentStateReturnType<T> {
  const [value, setValue] = useState<T>(initialState);
  const [checkValue, setCheckValue] = useState<T>(initialState);
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

type UseConfidentStateReturnType<T> = [ T, boolean, (value: T) => void];