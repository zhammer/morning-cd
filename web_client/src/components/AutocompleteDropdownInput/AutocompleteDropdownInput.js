import React from 'react';
import { FlexColumn } from './AutocompleteDropdownInput.styles';

const AutocompleteDropdownInput = ({
  ClearButtonComponent,
  InputComponent,
  OptionComponent,
  LoadingComponent,
  options,
  onInputChange,
  inputValue,
  className,
  onOptionSelected,
  mapOptionToProps,
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
    {options.map((option, index) => (
      <OptionComponent key={index} onClick={() => onOptionSelected(option)} {...mapOptionToProps(option)} />
    ))}
  </FlexColumn>
);

export default AutocompleteDropdownInput;
