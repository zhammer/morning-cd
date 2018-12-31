import React, { useEffect, useState, useRef } from 'react';
import useConfidentState from '../../hooks/useConfidentState';
import { FlexColumn } from './AutocompleteDropdownInput.styles';

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

  function handleInputChange(e) {
    const newInput = e.target.value;
    setInput(newInput);
    if (newInput !== '') {
      setLoading(true);
    }
    else {
      setOptions([]);
      setLoading(false);
    }
  }

  const mapOptionToProps = props.mapOptionToProps || (option => option);
  return (
    <FlexColumn className={props.className}>
      <props.InputComponent
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        spellCheck={false} /* <-- temporary */ >
      </props.InputComponent>
      {loading && <props.LoadingComponent />}
      {input && !loading && <props.ClearButtonComponent onClick={handleClearButtonClicked} />}
      {options.map((option, index) => (
        <props.OptionComponent key={index} onClick={() => props.onOptionSelected(option)} {...mapOptionToProps(option)} />
      ))}
    </FlexColumn>
  );
}