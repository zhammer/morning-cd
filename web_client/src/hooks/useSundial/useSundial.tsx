import { useEffect, useState } from 'react';
import util from './util';
import { FetchSunlightWindows, SunlightWindows, TimeOfDay, Sundial, SundialEventCallbacks } from './types';

/**
 * A sundial that is aware of the current time of day. The sundial is valid once `calibrated` is true.
 * @param fetchSunlightWindows Asynchronous function that fetches yesterday, today and tomorrow sunlight windows given today's date.
 * @param callbacks Some callbacks that will be invoked as the sundial calibrates and changes phase of day.
 */
export default function useSundial(fetchSunlightWindows: FetchSunlightWindows, callbacks: SundialEventCallbacks) {
  const [sunlightWindows, setSunlightWindows] = useState(initialSunlightWindows);
  const [timeOfDay, setTimeOfDay] = useState(TimeOfDay.Day);
  const [calibrated, setCalibrated] = useState(false);

  useEffect(() => {
    calibrateSundial();
  }, [])

  useEffect(() => {
    if (calibrated) {
      if (timeOfDay === TimeOfDay.Day) {
        callbacks.onCalibrateToDay && callbacks.onCalibrateToDay();
      }
      else {
        callbacks.onCalibrateToNight && callbacks.onCalibrateToNight();
      }
    }
  }, [calibrated])

  useEffect(() => {
    if (calibrated) {
      handleNewSundialPhase();
    }
  }, [timeOfDay])

  async function handleNewSundialPhase() {
    switch (timeOfDay) {
      case TimeOfDay.BeforeSunrise:
        callbacks.onNewDay && callbacks.onNewDay();
        const todaysDate = new Date();
        const newSunlightWindows = await fetchSunlightWindows(todaysDate);
        setSunlightWindows(newSunlightWindows);
        util.setTimedEvent(() => setTimeOfDay(TimeOfDay.Day), newSunlightWindows.today.sunrise);
        break;
      case TimeOfDay.Day:
        util.setTimedEvent(() => setTimeOfDay(TimeOfDay.AfterSunset), sunlightWindows.today.sunset);
        callbacks.onSunrise && callbacks.onSunrise();
        break;
      case TimeOfDay.AfterSunset:
        util.setTimedEvent(() => setTimeOfDay(TimeOfDay.BeforeSunrise), util.midnightAfter(sunlightWindows.today.sunset));
        callbacks.onSunset && callbacks.onSunset();
        break;
    }
  }

  async function calibrateSundial() {
    const now = new Date();
    const sunlightWindows = await fetchSunlightWindows(now);
    const timeOfDay = util.timeOfDay(now, sunlightWindows.today);
    setSunlightWindows(sunlightWindows);
    setTimeOfDay(timeOfDay);
    setCalibrated(true);
    switch (timeOfDay) {
      case TimeOfDay.BeforeSunrise:
        util.setTimedEvent(() => setTimeOfDay(TimeOfDay.Day), sunlightWindows.today.sunrise);
        break;
      case TimeOfDay.Day:
        util.setTimedEvent(() => setTimeOfDay(TimeOfDay.AfterSunset), sunlightWindows.today.sunset);
        break;
      case TimeOfDay.AfterSunset:
        util.setTimedEvent(() => setTimeOfDay(TimeOfDay.BeforeSunrise), util.midnightAfter(sunlightWindows.today.sunset));
        break;
    }
  }

  return mapStateToSundial({ sunlightWindows, timeOfDay, calibrated });
}

const initialSunlightWindows: SunlightWindows = {
  yesterday: {
    sunrise: new Date('August 3, 1901 05:20:00'),
    sunset: new Date('August 3, 1901 18:52:00')
  },
  today: {
    sunrise: new Date('August 4, 1901 05:21:00'),
    sunset: new Date('August 4, 1901 18:51:00')
  },
  tomorrow: {
    sunrise: new Date('August 5, 1901 05:21:00'),
    sunset: new Date('August 5, 1901 18:51:00')
  }
}

interface SundialState {
  sunlightWindows: SunlightWindows;
  timeOfDay: TimeOfDay;
  calibrated: Boolean;
}

function mapStateToSundial(state: SundialState): Sundial {
  const { calibrated, timeOfDay, sunlightWindows: { yesterday, today, tomorrow } } = state;
  return {
    calibrating: !calibrated,
    isDay: timeOfDay === TimeOfDay.Day,
    lastSunrise: (timeOfDay === TimeOfDay.BeforeSunrise ? yesterday.sunrise : today.sunrise)
  }
}