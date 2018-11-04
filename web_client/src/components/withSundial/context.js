import React, { createContext } from 'react';

export const { Provider: SundialProvider, Consumer: SundialConsumer } = createContext();

export const withSundialConsumer = mapSundialToProps => WrappedComponent => props => (
  <SundialConsumer>
    {sundial => <WrappedComponent {...mapSundialToProps(sundial)} {...props} />}
  </SundialConsumer>
);
