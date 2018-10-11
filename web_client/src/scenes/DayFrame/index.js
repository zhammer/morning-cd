import React from 'react';
import colors from 'theme';
import Sun from 'components/Sun';
import { SunContainer } from './DayFrame.styles';

const DayFrame = ({ children }) => (
  <div>
    {children}
    <SunContainer>
      <Sun fill={colors.orange} />
    </SunContainer>
  </div>
);

export default DayFrame;
