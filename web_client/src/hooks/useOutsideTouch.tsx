import { MutableRefObject, useEffect } from "react";

interface Handlers {
  onOutsideTouchStart?: () => void;
  onOutsideTouchEnd?: () => void;
}

const TOUCH_START = 'touchstart';
const TOUCH_END = 'touchend';

/**
 * Hook for easily responding to touchstart and touchend events from elements
 * 'outside' of a given html element.
 */
export default function useOutsideTouch<T extends HTMLElement>(ref: MutableRefObject<T | null>, handlers: Handlers) {
  useEffect(() => {
    document.addEventListener(TOUCH_START, listener);
    document.addEventListener(TOUCH_END, listener);

    return () => {
      document.removeEventListener(TOUCH_START, listener);
      document.removeEventListener(TOUCH_END, listener);
    }
  }, []);

  function listener(event: TouchEvent) {
    if (!ref.current) {
      return;
    }

    if (ref.current.contains(event.target as Node)) {
      return;
    }

    if (event.type === TOUCH_START) {
      handlers.onOutsideTouchStart && handlers.onOutsideTouchStart();
    }

    if (event.type === TOUCH_END) {
      handlers.onOutsideTouchEnd && handlers.onOutsideTouchEnd();
    }
  }

}
