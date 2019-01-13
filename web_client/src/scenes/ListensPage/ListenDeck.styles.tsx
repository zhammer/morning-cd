/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import styled from '@emotion/styled/macro';
import colors from '../../theme';
import useIsDaySundialConsumer from '../../util/useIsDaySundialConsumer';

jsx;  // https://github.com/emotion-js/emotion/issues/1112

export const Separater = styled.hr`
  border: 0;
  height: 1.5px;
  @media (min-width: 35em) {
    height: 2px;
  }
  width: 90%;
  opacity: .25;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), ${colors.lightGray}, rgba(0, 0, 0, 0));
`;

export function ShowNewListensButton(props: React.HTMLProps<HTMLDivElement>) {
  const isDay = useIsDaySundialConsumer();

  return (
    <div
      css={css`
        cursor: pointer;
        text-align: center;
        background: ${colors.lightTealTransparent};
        transition: color 5s linear;
        margin-bottom: .5em;
        padding: .25em 0;
        border-radius: .25em;
        color: ${isDay ? colors.darkGray : colors.white};
        font-size: .75em;
        @media (min-width: 35em) {
          font-size: .65em;
        }
      `}
      {...props}
      />
  )
}

export const Container = styled.div`
  margin-bottom: .75em;
`;
