import React, { Component } from 'react';
import AutocompleteDropdownInput from './AutocompleteDropdownInput';

class AutocompleteDropdownInputContainer extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  state = {
    options: [],
    value: '',
    loading: false
  }

  handleInputChange = (value) => {
    this.setState({ value });
    if (!value) {
      this.setState({ loading: false, options: [] });
    }
    else {
      this.setState({ loading: true });
      setTimeout(() => {
        if (this.state.value === value) {
          this.props.fetchOptions(value)
            .then(options => this.setState({ options, loading: false }));
        }
      }, this.props.fetchDelay || 2000);
    }
  };

  handleClearButtonClicked = () => {
    this.handleInputChange('');
    this.inputRef.current.focus();
  };

  render = () => {
    const {
      ClearButtonComponent,
      InputComponent,
      OptionComponent,
      LoadingComponent,
      className,
      onOptionSelected,
      mapOptionToProps = option => option
    } = this.props;
    const { options, value, loading } = this.state;
    return (
      <AutocompleteDropdownInput
        ClearButtonComponent={ClearButtonComponent}
        InputComponent={InputComponent}
        OptionComponent={OptionComponent}
        LoadingComponent={LoadingComponent}
        onInputChange={this.handleInputChange}
        options={options}
        inputValue={value}
        className={className}
        onClearButtonClicked={this.handleClearButtonClicked}
        onOptionSelected={onOptionSelected}
        mapOptionToProps={mapOptionToProps}
        loading={loading}
        inputRef={this.inputRef}
        />
    );
  }
}

export default AutocompleteDropdownInputContainer;
