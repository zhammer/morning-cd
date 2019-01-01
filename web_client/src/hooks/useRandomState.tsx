import { useState } from 'react';

/**
 * Get a random element from an array.
 * @param array Array of elements.
 */
function randomElement<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}

export default function useRandomState<T>(options: Array<T>): T {
  const [prop] = useState(randomElement(options));
  return prop;
}