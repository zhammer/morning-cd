import React from 'react';
import colors from '../../theme';
import { Container, Wind } from './WindLoading.styles';

function WindLoading() {
  return (
    <Container>
      <Wind top='0%' delay={1.5} fill={colors.teal} />
      <Wind top='25%' delay={0} fill={colors.lightGray} />
      <Wind top='50%' delay={2.5} fill={colors.lightTeal} />
    </Container>
  );
}

export default WindLoading;
