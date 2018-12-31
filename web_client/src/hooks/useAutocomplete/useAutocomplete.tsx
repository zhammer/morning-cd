import { useEffect, useState } from 'react';
import useConfidentState from '../useConfidentState';

type FetchOptionsCallback<T> = (input: string) => Promise<Array<T>>;

type UseAutocompleteReturnType<T> = [
  string,
  (newInput: string) => void,
  Array<T>,
  boolean
];

export default function useAutocomplete<T>(fetchOptionsCallback: FetchOptionsCallback<T>, msUntilConfident: number): UseAutocompleteReturnType<T> {
  const [input, confident, setInput] = useConfidentState('', msUntilConfident);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Array<T>>([]);

  useEffect(() => {
    if (confident && input !== '') {
      fetchOptions(input);
    }
  }, [confident]);

  async function fetchOptions(input: string) {
    setLoading(true);
    const newOptions = await fetchOptionsCallback(input);
    setOptions(newOptions);
    setLoading(false);
  }

  function handleInputChange(newInput: string) {
    setInput(newInput);
    if (newInput !== '') {
      setLoading(true);
    }
    else {
      setOptions([]);
      setLoading(false);
    }
  }

  return [input, handleInputChange, options, loading];
}
