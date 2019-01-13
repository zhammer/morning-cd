import React from 'react';
import { Circle, Container, Text } from './HelpButton.styles';

interface HelpButtonProps {
  onClick(): void;
}

function HelpButton({ onClick }: HelpButtonProps) {
  return (
    <Container onClick={onClick} >
      <Text>?</Text>
      <Circle />
    </Container>
  );
}

export default HelpButton;
