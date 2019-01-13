import { useRef, useEffect } from "react";

/**
 * Hook to use an interval that can be toggled on and off.
 * @param func Function to be called on every interval while on.
 * @param intervalMs Ms interval at which `func` should be called.
 * @param on Boolean indicating if interval is 'on' at the moment.
 */
export default function useOnOffInterval(func: Function, intervalMs: number, on: boolean): void {
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (on) {
      intervalRef.current = setInterval(func, intervalMs);
    }
    else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [on]);
}
