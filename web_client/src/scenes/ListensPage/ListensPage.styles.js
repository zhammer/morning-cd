import styled from '@emotion/styled/macro';
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


export const Sub = withIsDaySundialConsumer(styled('a')`
  color: ${props => props.isDay ? colors.teal : colors.lightTeal};
  transition: color .2s linear;
  text-align: center;
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: .6em;
  text-decoration: none;
  display: block;
  padding-bottom: .75em;


  @media (min-width: 35em) {
    font-size: .5rem;
    padding-bottom: .9em;
  }

  &:hover {
    cursor: pointer;
    color: ${props => props.isDay ? colors.strongTeal : colors.teal};
  }
`);
