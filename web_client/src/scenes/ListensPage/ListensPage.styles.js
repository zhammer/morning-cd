import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/core';
import colors from 'theme';
import withIsDaySundialConsumer from 'components/util/withIsDaySundialConsumer';

export const Header = withIsDaySundialConsumer(styled('div')`
  color: ${props => props.isDay ? colors.darkGray : colors.white};
  transition: color 5s linear;

  margin: 0 auto;
  text-align: center;
  padding: .75em 0 .1em;

  @media (min-width: 35em) {
    padding: 1em 0 .1em;
  }
`);


const fadein = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;


export const Sub = withIsDaySundialConsumer(styled('a')`
  color: ${props => props.isDay ? colors.teal : colors.lightTeal};
  transition: color 5s linear, text-decoration .5s linear;
  text-align: center;
  font-family: 'Open Sans Condensed', sans-serif;
  text-decoration: underline solid transparent;
  animation: ${fadein} .5s ease-in 3s both;

  &:hover {
    cursor: pointer;
    text-decoration: underline solid ${props => props.isDay ? colors.darkGray : colors.white};
  }
`);


export const SubRow = styled('div')`
  font-size: .6rem;
  padding-bottom: .75em;
  display: flex;
  justify-content: center;

  @media (min-width: 35em) {
    font-size: .5rem;
    padding-bottom: .9em;
  }
`;
