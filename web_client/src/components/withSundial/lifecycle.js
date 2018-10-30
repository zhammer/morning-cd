export const SUNDIAL_CALIBRATED_TO_DAY = 'SUNDIAL_CALIBRATED_TO_DAY';
export const SUNDIAL_CALIBRATED_TO_NIGHT = 'SUNDIAL_CALIBRATED_TO_NIGHT';
export const SUNDIAL_TURNED_TO_NIGHT_FROM_DAY = 'SUNDIAL_TURNED_TO_NIGHT_FROM_DAY';
export const SUNDIAL_TURNED_TO_DAY_FROM_NIGHT = 'SUNDIAL_TURNED_TO_DAY_FROM_NIGHT';

export const sundialCalibrated = (prevSundial, currentSundial) => (
  prevSundial.calibrating && !currentSundial.calibrating
);

export const sundialCalibratedToDay = (prevSundial, currentSundial) => (
  sundialCalibrated(prevSundial, currentSundial) && currentSundial.isDay
);

export const sundialCalibratedToNight = (prevSundial, currentSundial) => (
  sundialCalibrated(prevSundial, currentSundial) && !currentSundial.isDay
);

export const sundialTurnedToNightFromDay = (prevSundial, currentSundial) => (
  !prevSundial.calibrating && prevSundial.isDay && !currentSundial.isDay
);

export const sundialTurnedToDayFromNight = (prevSundial, currentSundial) => (
  !prevSundial.calibrating && !prevSundial.isDay && currentSundial.isDay
);

export const sundialEventFromUpdate  = (prevSundial, currentSundial) => {
  if (sundialCalibratedToDay(prevSundial, currentSundial)) {
    return SUNDIAL_CALIBRATED_TO_DAY;
  }

  else if (sundialCalibratedToNight(prevSundial, currentSundial)) {
    return SUNDIAL_CALIBRATED_TO_NIGHT;
  }

  else if (sundialTurnedToNightFromDay(prevSundial, currentSundial)) {
    return SUNDIAL_TURNED_TO_NIGHT_FROM_DAY;
  }

  else if (sundialTurnedToDayFromNight(prevSundial, currentSundial)) {
    return SUNDIAL_TURNED_TO_DAY_FROM_NIGHT;
  }

  else return null;
};
