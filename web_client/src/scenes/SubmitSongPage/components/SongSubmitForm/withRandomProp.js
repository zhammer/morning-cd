import React from 'react';

const randomElement = array => array[Math.floor(Math.random() * array.length)];

/**
 *  Given a list of `options` and a `mapSelectedToProps` function that builds a props dict
 *  from an element in `options`, randomly selected an elemnt from `options` and pass it as
 *  additional props to `WrappedComponent`.
 */
const withRandomProps = (WrappedComponent, options, mapSelectedToProps) => props => {
  const selected = randomElement(options);
  const propsFromSelected = mapSelectedToProps(selected);
  return <WrappedComponent {...propsFromSelected} { ...props } />;
};

export default withRandomProps;
