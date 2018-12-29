import { SunlightWindow, TimeOfDay } from './types';

type Callback = (...args: any[]) => void;

/**
 * Set a function to be called at a given `eventDatetime`.
 * @param callback Function to call at `eventDatetime`.
 * @param eventDatetime Time at which callback should be invoked.
 */
function setTimedEvent(callback: Callback, eventDatetime: Date) {
  const now = new Date();
  console.log(now);
  console.log(eventDatetime);
  const millisecondsUntilEvent = eventDatetime.getTime() - now.getTime();
  if (millisecondsUntilEvent <= 0) {
    throw new Error('Must set timed event for an `eventDateTime` in the future.');
  }
  return setTimeout(callback, millisecondsUntilEvent);
}

function midnightAfter(datetime: Date): Date {
  var midnight = new Date(datetime);
  midnight.setHours(24, 0, 0, 0);
  return midnight;
};

function timeOfDay(time: Date, today: SunlightWindow): TimeOfDay {
  if (time < today.sunrise) {
    return TimeOfDay.BeforeSunrise;
  }
  else if (time > today.sunset) {
    return TimeOfDay.AfterSunset;
  }
  else {
    return TimeOfDay.Day;
  }
};

export default {
  midnightAfter,
  timeOfDay,
  setTimedEvent
};
