import React, { useEffect, useState, useRef } from 'react';
import AutocompleteDropdownInputOld from './AutocompleteDropdownInput';
import useConfidentState from '../../hooks/useConfidentState';

export default function AutocompleteDropdownInput(props) {
  const [input, confident, setInput] = useConfidentState('', 2000);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    if (confident && input !== '') {
      fetchOptions(input);
    }
  }, [confident]);

  async function fetchOptions(value) {
    setLoading(true);
    const newOptions = await props.fetchOptions(value);
    setOptions(newOptions);
    setLoading(false);
  }

  function handleClearButtonClicked() {
    setInput('');
    setOptions([]);
    setLoading(false);
    inputRef.current.focus();
  }

  function handleInputChange(newInput) {
    setInput(newInput);
    if (newInput !== '') {
      setLoading(true);
    }
    else {
      setOptions([]);
      setLoading(false);
    }
  }

  const {
    ClearButtonComponent,
    InputComponent,
    OptionComponent,
    LoadingComponent,
    className,
    onOptionSelected,
    mapOptionToProps = option => option
  } = props;
  return (
    <AutocompleteDropdownInputOld
      ClearButtonComponent={ClearButtonComponent}
      InputComponent={InputComponent}
      OptionComponent={OptionComponent}
      LoadingComponent={LoadingComponent}
      onInputChange={handleInputChange}
      options={options}
      inputValue={input}
      className={className}
      onClearButtonClicked={handleClearButtonClicked}
      onOptionSelected={onOptionSelected}
      mapOptionToProps={mapOptionToProps}
      loading={loading}
      inputRef={inputRef}
      />
  );
}
