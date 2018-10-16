import styled, { keyframes } from 'react-emotion';
import colors from 'theme';
import withIsDaySundialConsumer from 'components/util/withIsDaySundialConsumer';

const glowing = keyframes`
  0%   { color: ${colors.lightGray}; }
  50%  { color: ${colors.white};     }
  100% { color: ${colors.lightGray}; }
`;

export const Container = withIsDaySundialConsumer(styled('div')`
  & div {
    color: ${props => props.isDay ? colors.darkGray : colors.lightGray};
    transition: color 5s linear;
    ${props => !props.isDay && `animation: ${glowing} 5s linear 5s infinite forwards`};
  }
  & svg {
    fill: ${props => props.isDay ? colors.darkGray : colors.lightGray};
    transition: color 5s linear;
  }
`);

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
