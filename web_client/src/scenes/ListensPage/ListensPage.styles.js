import styled from '@emotion/styled/macro';
import colors from 'theme';
import withIsDaySundialConsumer from 'components/util/withIsDaySundialConsumer';

export const Header = withIsDaySundialConsumer(styled('div')`
  color: ${props => props.isDay ? colors.darkGray : colors.white};
  transition: color 5s linear;

  margin: 0 auto;
  text-align: center;
  padding: .75em 0;

  @media (min-width: 35em) {
    padding: 1em 0;
  }
`);
