import styled, { keyframes } from 'react-emotion';

const rise = keyframes`
  from { transform: translateY(.5em); }
  to   { transform: translateY(0em); }
`;

export const SunContainer = styled('div')`
  position: fixed;
  width: 100%;
  bottom: -50vw;
  animation: ${rise} 3s ease-in 0s both;
  z-index: -1;
`;
