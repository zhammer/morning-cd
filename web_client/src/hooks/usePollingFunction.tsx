import { useRef, useEffect } from "react";

/**
 * Hook to use a polling function and toggle polling on/off.
 * @param pollingFunction Function called on every poll.
 * @param pollingInterval Ms interval at which `pollingFunction` should be called.
 * @param pollingOn Boolean indicating if polling is 'on' at the moment.
 */
export default function usePollingFunction(pollingFunction: Function, pollingInterval: number, pollingOn: boolean): void {
  const pollingIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (pollingOn) {
      pollingIntervalRef.current = setInterval(pollingFunction, pollingInterval);
    }
    else {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    }
  }, [pollingOn]);
}