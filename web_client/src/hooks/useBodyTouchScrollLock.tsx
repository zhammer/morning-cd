import { MutableRefObject, useEffect } from "react";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { isMobile } from 'react-device-detect';
import useOutsideTouch from "./useOutsideTouch";

/**
 * A bit of a hacky hook that allows for mobile html elements to be touched and
 * gestured without also scrolling the web page's body.
 *
 * Note: The most obvious way to do this is to disableBodyScroll when the independently
 * scrollable element 'touchstart's, and re-enableBodyScroll when then independently
 * scrollable element 'touchend's. For some reason this causes buggy behavior when I
 * tested on my iOS12 iPhone.
 *
 * So this hook does the opposite. It disables body scroll on everything but the
 * independently scrollable element at mount and reenables body scroll whenever
 * anything outside of the element is touched.
 *
 * @param ref Ref to an html element that, when touched, will lock body scrolling.
 */
export default function useBodyTouchScrollLock(ref: MutableRefObject<HTMLElement | null>) {
  useEffect(() => {
    if (ref.current && isMobile) {
      disableBodyScroll(ref.current);
    }
  }, [ref]);

  useEffect(() => {
    return () => {
      clearAllBodyScrollLocks();
    }
  }, []);

  useOutsideTouch(ref, {
    onOutsideTouchStart: handleOutsideTouchStart,
    onOutsideTouchEnd: handleOutsideTouchEnd
  });

  function handleOutsideTouchStart() {
    ref.current && enableBodyScroll(ref.current);
  }

  function handleOutsideTouchEnd() {
    ref.current && disableBodyScroll(ref.current);
  }


}
