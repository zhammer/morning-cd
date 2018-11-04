import React, { Component } from 'react';
import { Container, Counter } from './withMaxCharacters.styles';

const withMaxCharacters = (InputComponent, maxCharacters) => (
  class extends Component {
    state = {
      isFocused: false
    }
    handleInputFocused = () => this.setState({ isFocused: true });
    handleInputBlurred = () => this.setState({ isFocused: false });
    render = () => (
      <Container>
        <InputComponent
          maxLength={maxCharacters}
          onFocus={this.handleInputFocused}
          onBlur={this.handleInputBlurred}
          { ...this.props } />
        {this.state.isFocused && this.props.value && <Counter>{this.props.value.length}/{maxCharacters}</Counter>}
      </Container>
    );
  }
);

export default withMaxCharacters;
