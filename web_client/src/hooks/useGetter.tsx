import { useRef, useEffect } from "react";

/**
 * Hook that provides a `getValue` function to get the current state of a mutable value.
 * @param value Value to access via `getValue`.
 */
export default function useGetter<T>(value: T): () => T {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  });

  function getValue() {
    return valueRef.current;
  }

  return getValue;
}
