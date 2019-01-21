/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled';
import CircleSvg from './Circle.svg';
import colors from '../../../theme';
import useIsDaySundialConsumer from '../../../util/useIsDaySundialConsumer';

jsx; // https://github.com/emotion-js/emotion/issues/1112

export const Container = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const isDay = useIsDaySundialConsumer();

  return (
    <div
      css={css`
        position: fixed;
        height: 2.5em;
        width: 2.5em;
        right: .5em;
        bottom: .5em;
        opacity: .5;
        cursor: pointer;
        z-index: 100;
        color: ${isDay ? colors.mediumGray : colors.lightGray};
        fill: ${isDay ? colors.mediumGray : colors.lightGray};
        transition: color 5s linear, fill 5s linear, opacity .5s linear;

        &:hover {
          opacity: 1;
        }
      `}
      {...props}
    />
  )
}


export const Circle = styled(CircleSvg)`
`;

export const Text = styled.div`
  user-select: none;
  font-size: 3rem;
  position: fixed;
  right: .45em;
  bottom: .57em;
  cursor: pointer;
  transform: scaleY(.55);
  line-height: 0;
`;
