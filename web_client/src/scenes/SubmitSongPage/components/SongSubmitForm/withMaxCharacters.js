import React, { Component } from 'react';
import styled from 'react-emotion';
import colors from 'theme';

const Container = styled('div')`
  position: relative;
`;

const Counter = styled('div')`
  position: absolute;
  right: .15rem;
  bottom: .25rem;
  font-size: .5rem;
  color: ${colors.lightGray};
`;

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
