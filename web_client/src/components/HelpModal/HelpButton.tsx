import React from 'react';
import { Circle, Container, Text } from './HelpButton.styles';
import useIsDaySundialConsumer from '../../util/useIsDaySundialConsumer';

interface HelpButtonProps {
  onClick(): void;
}

function HelpButton({ onClick }: HelpButtonProps) {
  const isDay = useIsDaySundialConsumer();

  return (
    <Container isDay={isDay} onClick={onClick} >
      <Text>?</Text>
      <Circle />
    </Container>
  );
}

export default HelpButton;
