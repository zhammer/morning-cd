import React from 'react';
import colors from '../../theme';
import Sun from '../../components/Sun';
import { DayBackdrop, NightBackdrop, SunContainer } from './DayNightFrame.styles';
import Stars from './Stars';
import useIsDaySundialConsumer from '../../util/useIsDaySundialConsumer';

interface DayFrameProps {
  children: React.ReactNode;
}

function DayFrame ({ children }: DayFrameProps) {
  const isDay = useIsDaySundialConsumer();

  return (
    <div>
      <DayBackdrop />
      <NightBackdrop isDay={isDay} />
      <Stars />
      <SunContainer isDay={isDay} >
        <Sun fill={colors.orange} />
      </SunContainer>
      {children}
    </div>
  )
}

export default DayFrame;
