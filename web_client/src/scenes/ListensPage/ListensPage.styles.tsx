/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/core';
import colors from '../../theme';
import useIsDaySundialConsumer from '../../util/useIsDaySundialConsumer';

jsx; // https://github.com/emotion-js/emotion/issues/1112

export const Header = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const isDay = useIsDaySundialConsumer();
  return (
    <div
      css={css`
          color: ${isDay ? colors.darkGray : colors.white};
          transition: color 5s linear;
          margin: 0 auto;
          text-align: center;
          padding: .75em 0 .1em;
          @media (min-width: 35em) {
            padding: 1em 0 .1em;
          }
      `}
      {...props}
    />
  )
}

const fadein = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export const Sub = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isDay = useIsDaySundialConsumer();
  const color = isDay ? colors.teal : colors.yellow;
  return (
    <a
      css={css`
        color: ${color};
        transition: color 5s linear, text-decoration .5s linear;
        text-align: center;
        font-family: 'Open Sans Condensed', sans-serif;
        text-decoration: underline solid transparent;
        animation: ${fadein} .5s ease-in 3s both;

        &:hover {
          color: ${color};
          cursor: pointer;
          text-decoration: underline solid ${isDay ? colors.darkGray : colors.white};
        }
      `}
      {...props}
    />
  )
}

export const SubRow = styled.div`
  font-size: .6rem;
  padding-bottom: .75em;
  display: flex;
  justify-content: center;

  @media (min-width: 35em) {
    font-size: .5rem;
    padding-bottom: .9em;
  }
`;
