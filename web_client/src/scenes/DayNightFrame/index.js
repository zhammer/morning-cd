import React from 'react';
import colors from 'theme';
import Sun from 'components/Sun';
import { DayBackdrop, NightBackdrop, SunContainer } from './DayNightFrame.styles';
import Stars from './components/Stars';

const DayFrame = ({ children }) => (
  <div>
    <DayBackdrop />
    <NightBackdrop />
      <Stars />
      <SunContainer>
        <Sun fill={colors.orange} />
      </SunContainer>
      {children}
  </div>
);

export default DayFrame;
