import { MutableRefObject, useEffect } from "react";

interface Handlers {
  onOutsideTouchStart?: () => void;
  onOutsideTouchEnd?: () => void;
}

/**
 * Hook for easily responding to touchstart and touchend events from elements
 * 'outside' of a given html element.
 */
export default function useOutsideTouch<T extends HTMLElement>(ref: MutableRefObject<T | null>, handlers: Handlers) {
  useEffect(() => {
    document.addEventListener('touchstart', listener);
    document.addEventListener('touchend', listener);
  }, []);

  function listener(event: TouchEvent) {
    if (!ref.current) {
      return;
    }

    if (ref.current.contains(event.target as Node)) {
      return;
    }

    if (event.type === 'touchstart') {
      handlers.onOutsideTouchStart && handlers.onOutsideTouchStart();
    }

    if (event.type === 'touchend') {
      handlers.onOutsideTouchEnd && handlers.onOutsideTouchEnd();
    }
  }

}
