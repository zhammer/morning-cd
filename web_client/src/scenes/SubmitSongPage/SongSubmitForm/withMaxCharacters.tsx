import React, { Component, useState, HTMLProps } from 'react';
import { Container, Counter } from './withMaxCharacters.styles';

function withMaxCharacters(InputComponent: React.ComponentType<any>, maxCharacters: number) {
  return function (props: any) {
    const [focused, setFocused] = useState(false);

    function handleInputFocused() {
      setFocused(true);
    }

    function handleInputBlurred() {
      setFocused(false);
    }

    return (
      <Container>
        <InputComponent
          maxLength={maxCharacters}
          onFocus={handleInputFocused}
          onBlur={handleInputBlurred}
          { ...props } />
        {focused && props.value && <Counter>{props.value.length}/{maxCharacters}</Counter>}
      </Container>
    )
  }
}

export default withMaxCharacters;
