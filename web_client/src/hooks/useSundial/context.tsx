import { createContext } from 'react';
import { Sundial } from './types';

const SundialContext = createContext<Sundial>({
  calibrating: true,
  isDay: true,
  lastSunrise: new Date('August 4, 1901 05:21:00')
});

export default SundialContext;