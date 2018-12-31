import React, { Fragment } from 'react';
import { Star1, Star2, Star3, Star4, Star5, Star6, Star7, Star8 } from './Stars.styles';
import useIsDaySundialConsumer from '../../components/util/useIsDaySundialConsumer';

function Stars() {
  const isDay = useIsDaySundialConsumer();
  
  return (
    <Fragment>
      <Star1 isDay={isDay} />
      <Star2 isDay={isDay} />
      <Star3 isDay={isDay} />
      <Star4 isDay={isDay} />
      <Star5 isDay={isDay} />
      <Star6 isDay={isDay} />
      <Star7 isDay={isDay} />
      <Star8 isDay={isDay} />
    </Fragment>
  );
}

export default Stars;
