import React, { useRef, useEffect } from 'react';
import { Container } from './PushNotification.styles';
import { useGesture } from 'react-with-gesture';
import { useSpring, animated } from 'react-spring/hooks';
import useBodyTouchScrollLock from '../../hooks/useBodyTouchScrollLock';

type Coordinates = [number, number];

const AnimatedContainer = animated(Container);
const hiddenXy: Coordinates = [0, 100];
const visibleXy: Coordinates = [0, 0];
const MAX_Y_OFFSET = -20;

interface PushNotificationProps {
  children: React.ReactNode;
  visible: boolean;
  onSelect: () => void;
  onDismiss: () => void;
}

/**
 * A push notification that appears from the bottom of the window when set to visible
 * and can be dismissed by swiping down.
 */
function PushNotification({ children, visible, onDismiss, onSelect }: PushNotificationProps) {
  const notificationRef = useRef(null);
  useBodyTouchScrollLock(notificationRef);
  const [{ xy }, set] = useSpring<{ xy: Coordinates }>(() => ({ xy: hiddenXy }));
  const bind = useGesture(({ down: touchDown, delta, direction }) => {
    if (!touchDown && isDown(direction)) {
      onDismiss();
    }
    else {
      const y = delta[1];
      set({ xy: touchDown ? [0, Math.max(MAX_Y_OFFSET, y)] : [0, 0] });
    }
  });

  useEffect(() => {
    if (visible) {
      set({ xy: visibleXy });
    }
    else {
      set({ xy: hiddenXy });
    }
  }, [visible]);

  return (
    <AnimatedContainer
      {...bind()}
      onClick={onSelect}
      style={{ transform: xy.interpolate(((x: number, y: number) => `translateY(${y}px)`) as any) }}
      ref={notificationRef}
    >{children}</AnimatedContainer>
  )
};

function isDown([x, y]: Coordinates) {
  return y > 0;
}

export default PushNotification;
