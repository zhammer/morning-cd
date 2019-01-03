import { useState, useEffect, useRef } from 'react';

/**
 * Hook to check if state has remained the same for a given period of time.
 * @param initialState Initial state.
 * @param msUntilConfident Milliseconds after which state is considered confident if state is the same.
 */
export default function useConfidentState<T>(initialState: T, msUntilConfident: number): UseConfidentStateReturnType<T> {
  const [value, setValue] = useState<T>(initialState);
  const [checkValue, setCheckValue] = useState<T>(initialState);
  const [confident, setConfident] = useState<boolean>(true);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (value === checkValue) {
      setConfident(true);
    }
  }, [checkValue]);

  function handleValueChanged(newValue: T) {
    setValue(newValue);
    setConfident(false);
    timeoutId.current = setTimeout(() => setCheckValue(newValue), msUntilConfident);
  }

  function handleConfidentForceSet() {
    timeoutId.current && clearTimeout(timeoutId.current);
    setConfident(true);
  }

  return [value, confident, handleValueChanged, handleConfidentForceSet];
}

type UseConfidentStateReturnType<T> = [ T, boolean, (value: T) => void, () => void];