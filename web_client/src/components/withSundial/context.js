import React from 'react';
import SundialContext from '../../hooks/useSundial/context';

export const withSundialConsumer = mapSundialToProps => WrappedComponent => props => (
  <SundialContext.Consumer>
    {sundial => <WrappedComponent {...mapSundialToProps(sundial)} {...props} />}
  </SundialContext.Consumer>
);