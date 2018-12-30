import { useRef, useEffect } from 'react';

/**
 * From https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state.
 */
export default function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}