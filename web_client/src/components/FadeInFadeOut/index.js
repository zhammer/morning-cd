import React from 'react';
import { Transition, config } from 'react-spring';

const fixedOnLeaveStyles = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0'
};

const FadeInFadeOut = ({ children, visible, fixedOnLeave = true}) => (
  <Transition
    from={{opacity: 0}}
    enter={{opacity: 1}}
    leave={{opacity: 0, ...(fixedOnLeave ? fixedOnLeaveStyles : {})}}
    config={config.molasses}>
    {visible && (styles => <div style={styles}>{children}</div>)}
  </Transition>
);

export default FadeInFadeOut;
