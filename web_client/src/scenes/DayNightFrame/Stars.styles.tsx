/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { SVGProps } from 'react';
import Star from '../../components/Star';
import useIsDaySundialConsumer from '../../util/useIsDaySundialConsumer';

jsx; // https://github.com/emotion-js/emotion/issues/1112

interface StarProps extends SVGProps<SVGSVGElement> {
  dim?: boolean;
}

export const NightStar = ({ dim, ...props }: StarProps) => {
  const isDay = useIsDaySundialConsumer();
  return (
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
};