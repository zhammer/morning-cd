import React, { Component, useState, HTMLProps } from 'react';
import { Container, Counter } from './withMaxCharacters.styles';


/**
 * Add a maxCharacters limit and bottom-right text display on an input form.
 * (This is pretty odd and probably shouldn't be an HOC. I'll clean up later.)
 * (Also, the typing got confusing so I just set some things to `any`.)
 * @param InputComponent Component where user is inputting text.
 * @param maxCharacters Max characters of input string.
 */
function withMaxCharacters(InputComponent: React.ComponentType<any>, maxCharacters: number) {
  return function (props: any) {
    const [focused, setFocused] = useState(false);

    return (
      <Container>
        <InputComponent
          maxLength={maxCharacters}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          { ...props } />
        {focused && props.value && <Counter>{props.value.length}/{maxCharacters}</Counter>}
      </Container>
    )
  }
}

export default withMaxCharacters;
