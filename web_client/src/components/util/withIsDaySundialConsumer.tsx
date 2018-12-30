import React, { ComponentType, useContext, useMemo } from 'react';
import SundialContext from '../../hooks/useSundial/context';

export interface InjectedIsDayProps {
  isDay: boolean;
}

function withIsDaySundialConsumer<P extends InjectedIsDayProps>(WrappedComponent: ComponentType<P>) {
  return function wrapperComponent(props: P) {
    const { calibrating, isDay } = useContext(SundialContext);
    const isDayProp = useMemo(() => (calibrating || isDay), [calibrating, isDay]);
    return <WrappedComponent isDay={isDayProp} {...props} />
  }
}

export default withIsDaySundialConsumer;