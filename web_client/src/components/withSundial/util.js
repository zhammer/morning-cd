export const BEFORE_SUNRISE = 'BEFORE_SUNRISE';
export const DAY = 'DAY';
export const AFTER_SUNSET = 'AFTER_SUNSET';

export const midnightAfter = datetime => {
  var midnight = new Date(datetime);
  midnight.setHours(24, 0, 0, 0);
  return midnight;
};

export const timeOfDay = (time, sunlightWindow) => {
  if (time < sunlightWindow.sunrise) {
    return BEFORE_SUNRISE;
  }
  else if (time > sunlightWindow.sunset) {
    return AFTER_SUNSET;
  }
  else {
    return DAY;
  }
};

export default {
  BEFORE_SUNRISE,
  DAY,
  AFTER_SUNSET,
  midnightAfter,
  timeOfDay
};
