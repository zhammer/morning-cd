/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/core';
import WindSvg from './WindSvg';
import { SVGProps } from 'react';

jsx; // https://github.com/emotion-js/emotion/issues/1112

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

export const Container = styled.div`
  position: relative;
  height: 75%;
  width: 75%;
`;

interface WindProps extends SVGProps<SVGSVGElement> {
  top: string;
  delay: number;
}

export const Wind = ({ top, delay, ...props }: WindProps) => (
  <WindSvg
    css={css`
      position: absolute;
      height: 50%;
      width: 50%;
      animation: ${fadeinfadeout} 4s linear ${delay}s both infinite,
                 ${lefttoright} 4s linear ${delay}s both infinite;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: ${top};
    `}
    {...props}
  />
);
