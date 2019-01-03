import React, { ComponentType } from 'react';
import useIsDaySundialConsumer from './useIsDaySundialConsumer';

export interface InjectedIsDayProps {
  isDay: boolean;
}

function withIsDaySundialConsumer<P extends InjectedIsDayProps>(WrappedComponent: ComponentType<P>) {
  return function wrapperComponent(props: P) {
    const isDay = useIsDaySundialConsumer();
    return <WrappedComponent isDay={isDay} {...props} />
  }
}

export default withIsDaySundialConsumer;