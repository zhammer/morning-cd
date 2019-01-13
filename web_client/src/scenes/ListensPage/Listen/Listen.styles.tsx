/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import styled from '@emotion/styled/macro';
import colors from '../../../theme';
import useIsDaySundialConsumer from '../../../util/useIsDaySundialConsumer';

jsx;  // https://github.com/emotion-js/emotion/issues/1112

const glowing = keyframes`
  0%   { color: ${colors.lightGray}; }
  50%  { color: ${colors.white};     }
  100% { color: ${colors.lightGray}; }
`;

export const Container = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const isDay = useIsDaySundialConsumer();

  return (
    <div
      css={css`
        & div {
          color: ${isDay ? colors.darkGray : colors.lightGray};
          transition: color 5s linear;
          animation: ${isDay ? '' : glowing} 5s linear 5s infinite;
        }
        & svg {
          fill: ${isDay ? colors.darkGray : colors.lightGray};
          transition: fill 5s linear;
        }
      `}
      {...props}
       />
  )
}

export const Text = styled('div')`
  margin-left: .25em;
  word-break: break-word;
`;

export const SimpleRow = styled('div')`
  display: flex;
`;

export const SongLink = styled('a')`
  text-decoration: underline solid transparent;
  transition: text-decoration .5s linear;

  &:hover {
   text-decoration: underline solid ${colors.teal};
  }
`;

export const Row = styled('div')`
  display: flex;
  align-items: center;
  margin-top: .25em;

  font-size: .65em;

  & > svg {
    flex-shrink: 0;
    align-self: start;
    margin-top: .175em;
  }
`;

export const IconContainer = styled('div')`
  & > svg {
    height: 100%;
  }
`;
