import React, { Component } from 'react';
import { FlexColumn } from './AutocompleteDropdownInput.styles';

const AutocompleteDropdown = ({
  ClearButtonComponent,
  InputComponent,
  OptionComponent,
  LoadingComponent,
  options,
  onInputChange,
  inputValue,
  className,
  onOptionSelected,
  onClearButtonClicked,
  loading
}) => (
  <FlexColumn className={className}>
    <InputComponent
      value={inputValue}
      onChange={e => onInputChange(e.target.value)}
      spellCheck={false} /* <-- temporary */ >
    </InputComponent>
    {loading && <LoadingComponent />}
    {inputValue && !loading && <ClearButtonComponent onClick={onClearButtonClicked} />}
    {options.map((option, index) => <OptionComponent key={index} onClick={() => onOptionSelected(option)} {...option} />)}
  </FlexColumn>
);

class AutocompleteDropdownInput extends Component {
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
  };

  render = () => {
    const { ClearButtonComponent, InputComponent, OptionComponent, LoadingComponent, className, onOptionSelected } = this.props;
    const { options, value, loading } = this.state;
    return (
      <AutocompleteDropdown
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
        loading={loading}
        />
    );
  }
}

export default AutocompleteDropdownInput;
