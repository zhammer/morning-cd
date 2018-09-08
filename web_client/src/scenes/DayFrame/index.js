import React from 'react';
import styled, { keyframes } from 'react-emotion';
import colors from 'theme';
import Sun from 'components/Sun';

const rise = keyframes`
  from { transform: translateY(.5em); }
  to   { transform: translateY(0em); }
`;

const SunContainer = styled('div')`
  position: fixed;
  width: 100%;
  bottom: -50vw;
  animation: ${rise} 3s ease-in 0s both;
  z-index: -1;
`;

const DayFrame = ({ children }) => (
  <div>
    {children}
    <SunContainer>
      <Sun fill={colors.orange} />
    </SunContainer>
  </div>
);

export default DayFrame;
