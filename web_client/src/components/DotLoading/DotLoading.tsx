import React from 'react';
import colors from '../../theme';
import { Container, Dot, GrowCycle } from "./DotLoading.styles";

export default function DotLoading() {
  return (
    <Container>
      <GrowCycle delay={0} >
        <Dot fill={colors.teal} />
      </GrowCycle>
      <GrowCycle delay={1} >
        <Dot fill={colors.lightGray} />
      </GrowCycle>
      <GrowCycle delay={2} >
        <Dot fill={colors.lightTeal} />
      </GrowCycle>
    </Container>
  )
}