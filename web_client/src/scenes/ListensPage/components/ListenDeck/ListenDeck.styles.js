import styled from '@emotion/styled/macro';
import colors from 'theme';

export const Separater = styled('hr')`
  border: 0;
  height: 1.5px;
  @media (min-width: 35em) {
    height: 2px;
  }
  width: 90%;
  opacity: .25;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), ${colors.lightGray}, rgba(0, 0, 0, 0));
`;


export const Container = styled('div')`
  margin-bottom: .75em;
`;
