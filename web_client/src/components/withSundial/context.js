import React, { createContext } from 'react';

export const SundialContext = createContext();
export const SundialConsumer = SundialContext.Consumer;
export const SundialProvider = SundialContext.Provider;

export const withSundialConsumer = mapSundialToProps => WrappedComponent => props => (
  <SundialConsumer>
    {sundial => <WrappedComponent {...mapSundialToProps(sundial)} {...props} />}
  </SundialConsumer>
);
