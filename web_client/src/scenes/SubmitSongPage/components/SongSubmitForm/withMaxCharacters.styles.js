import styled from '@emotion/styled/macro';
import colors from 'theme';

export const Container = styled('div')`
  position: relative;
`;

export const Counter = styled('div')`
  position: absolute;
  right: .15rem;
  bottom: .25rem;
  font-size: .5rem;
  color: ${colors.lightGray};
`;
