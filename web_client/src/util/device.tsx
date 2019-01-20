import { isIOS } from 'react-device-detect';

interface IOSNavigator extends Navigator {
  standalone: boolean;
}

export const isStandaloneiOS = (
  isIOS &&
  (window.navigator as IOSNavigator).standalone == true
);
