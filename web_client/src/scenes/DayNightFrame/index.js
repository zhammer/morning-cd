import React from 'react';
import colors from 'theme';
import Sun from 'components/Sun';
import { DayBackdrop, NightBackdrop, SunContainer, DayNightStyles } from './DayNightFrame.styles';
import Stars from './components/Stars';

const DayFrame = ({ children }) => (
  <DayNightStyles>
    <DayBackdrop />
    <NightBackdrop />
      <Stars />
      <SunContainer>
        <Sun fill={colors.orange} />
      </SunContainer>
      {children}
  </DayNightStyles>
);

export default DayFrame;
