import styled from '@emotion/styled/macro';
import DotSvg from './Dot.svg';
import { keyframes } from '@emotion/core';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 20%;
  @media (min-width: 35em) {
    width: 10%;
  }
  height: 1em;
  margin: 0 auto;
`;

export const Dot = styled(DotSvg)`
  width: .25em;
`;

const grow = keyframes`
  0%  { transform: scale(1); }
  25% { transform: scale(1.5); }
  50% { transform: scale(1); }
`;

interface GrowProps {
  delay?: number;
}

export const GrowCycle = styled.div<GrowProps>`
  display: flex;
  animation: ${grow} 3s ${props => props.delay || 0}s linear infinite;
`;