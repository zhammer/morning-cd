/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { SVGProps } from 'react';
import Star from '../../components/Star';

jsx; // https://github.com/emotion-js/emotion/issues/1112

interface StarProps extends SVGProps<SVGSVGElement> {
  dim?: boolean;
  isDay: boolean;
}

// Not sure how to actually update the typing of props sent to child.
function shouldForwardProp(prop: string) {
  return prop !== 'isDay' && prop !== 'dim';
}

const NightStar = ({ dim, isDay, ...props }: StarProps) => (
  <Star
    css={css`
        opacity: ${isDay ? '0' : dim ? '.25' : '1'};
        transition: opacity 5s linear;
        height: 5%;
        position: fixed;
        z-index: -1;
    `}
    {...props}
  />
);

export const Star1 = (props: StarProps) => (
  <NightStar
    css={css`
      left: 2%;
      top: 5%;
    `}
    {...props} 
  />
);

export const Star2 = (props: StarProps) => (
  <NightStar
    css={css`
      right: 0%;
      top: 8%;
    `}
    {...props}
  />
);

export const Star3 = (props: StarProps) => (
  <NightStar
    css={css`
      right: 25%;
      top: 15%;
    `}
    {...props}
  />
);

export const Star4 = (props: StarProps) => (
  <NightStar
    css={css`
      left: 20%;
      top: 30%;
    `}
    {...props}
  />
);

export const Star5 = (props: StarProps) => (
  <NightStar
    css={css`
      bottom: 30%;
      left: 30%;
    `}
    {...props}
  />
);

export const Star6 = (props: StarProps) => (
  <NightStar
    css={css`
      bottom: 25%;
      right: 5%;
    `}
    {...props}
  />
);

export const Star7 = (props: StarProps) => (
  <NightStar
    css={css`
      bottom: 2%;
      left: 5%;
    `}
    {...props}
  />
);

export const Star8 = (props: StarProps) => (
  <NightStar
    css={css`
      right: 20%;
      bottom: 5%;
    `}
    {...props}
  />
);