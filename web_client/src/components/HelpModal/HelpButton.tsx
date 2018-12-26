import React from 'react';
import { Circle, Container, Text } from './HelpButton.styles';
import colors from '../../theme';

interface HelpButtonProps {
    onClick(): void;
}

const HelpButton = (props: HelpButtonProps) => (
  <Container onClick={props.onClick} >
    <Text>?</Text>
    <Circle />
  </Container>
);

export default HelpButton;
