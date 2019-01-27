import { useEffect } from "react";

/**
 * Hook to use an interval that can be toggled on and off.
 * `intervalMs` can be updated on the fly while the interval is on, in which case
 * a new interval at the new `intervalMs` will be started and the previous interval
 * will be cleared. See tests for more info.
 *
 * Maybe this should be called: useLiveInterval?
 *
 * @param func Function to be called on every interval while on.
 * @param intervalMs Ms interval at which `func` should be called.
 * @param on Boolean indicating if interval is 'on' at the moment.
 */
export default function useOnOffInterval(func: Function, intervalMs: number, on: boolean): void {
  useEffect(() => {
    if (on) {
      const interval = setInterval(func, intervalMs);
      return () => {
        clearInterval(interval);
      }
    }
  }, [on, intervalMs]);
}
