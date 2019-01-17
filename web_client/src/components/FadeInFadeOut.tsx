import React from 'react';
import { Transition, config } from 'react-spring';

const fixedOnLeaveStyles = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0'
};

interface FadeInFadeOutProps {
  children: React.ReactNode;
  visible: boolean;
  fixedOnLeave?: boolean;
}

function FadeInFadeOut({ children, visible, fixedOnLeave = true }: FadeInFadeOutProps) {
  return (
    <Transition
      items={visible}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0, ...(fixedOnLeave ? fixedOnLeaveStyles : {}) }}
      config={config.molasses}>
      {visible => visible && (styles => <div style={styles}>{children}</div>)}
    </Transition>
  );
}

export default FadeInFadeOut;
