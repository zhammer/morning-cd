import styled, { keyframes } from 'react-emotion';
import WindSvg from './WindSvg';

const fadeinfadeout = keyframes`
  0% { opacity: 0; }
  5%  { opacity: 0; }
  25% { opacity: 1; }
  75% { opacity: 1; }
  95%  { opacity: 0; }
  100% { opacity: 0; }
`;

// adding scaleX because the svg is facing to the left.
const lefttoright = keyframes`
  from { transform: translateX(-50%) scaleX(-1); }
  to   { transform: translateX(50%) scaleX(-1);  }
`;

export const Container = styled('div')`
  position: relative;
  height: 75%;
  width: 75%;
`;

export const Wind = styled(WindSvg)`
  position: absolute;
  height: 50%;
  width: 50%;
  animation: ${fadeinfadeout} 4s linear ${props => props.delay || 0}s both infinite, ${lefttoright} 4s linear ${props => props.delay || 0}s both infinite;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: ${props => props.top};
`;
