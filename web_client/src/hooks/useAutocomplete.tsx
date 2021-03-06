import { useEffect, useState } from 'react';
import useConfidentState from './useConfidentState';

type FetchOptionsCallback<T> = (input: string) => Promise<T[]>;

type UseAutocompleteReturnType<T> = [
  string,
  (newInput: string) => void,
  T[],
  boolean,
  () => void
];

/**
 * Hook for fetching autocomplete options based on a user's input. Options are fetched after input remains the same for `msUntilConfident`.
 * @param fetchOptionsCallback Asynchronous function to fetch autocomplete options given user's current input.
 * @param msUntilConfident Milliseconds after which user's input is considered 'confident' and fetchOptionsCallback is invoked. See useConfidentState hook.
 */
export default function useAutocomplete<T>(fetchOptionsCallback: FetchOptionsCallback<T>, msUntilConfident: number): UseAutocompleteReturnType<T> {
  const [input, confident, setInput, forceSetConfident] = useConfidentState('', msUntilConfident);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<T[]>([]);

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

  function handleSubmit() {
    if (!confident) {
      forceSetConfident();
    }
  }

  return [input, handleInputChange, options, loading, handleSubmit];
}
