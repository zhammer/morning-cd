import { useEffect, useState } from 'react';
import util from './util';
import { FetchSunlightWindows, SunlightWindows, TimeOfDay, Sundial, SundialEventCallbacks } from './types';
import usePrevious from '../usePrevious';

export default function useSundial(fetchSunlightWindows: FetchSunlightWindows, callbacks: SundialEventCallbacks) {
  const [sunlightWindows, setSunlightWindows] = useState<SunlightWindows>(initialSunlightWindows);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(TimeOfDay.Day);
  const [calibrated, setCalibrated] = useState<Boolean>(false);
  const prevCalibrated = usePrevious(calibrated);
  useEffect(() => {
    calibrateSundial();
  }, [])
  const { onSunrise, onSunset, onNewDay, onCalibrateToDay, onCalibrateToNight } = callbacks;
  useEffect(() => {
    if (!prevCalibrated && calibrated) {
      if (timeOfDay === TimeOfDay.Day) {
        onCalibrateToDay && onCalibrateToDay();
      }
      else {
        onCalibrateToNight && onCalibrateToNight();
      }
    }
    else if (prevCalibrated) {
      timeOfDay === TimeOfDay.BeforeSunrise && onNewDay && onNewDay();
      timeOfDay === TimeOfDay.Day && onSunrise && onSunrise();
      timeOfDay === TimeOfDay.AfterSunset && onSunset && onSunset();
    }
  }, [calibrated, timeOfDay])

  function letThereBeLight() {
    setTimeOfDay(TimeOfDay.Day);
    util.setTimedEvent(goGentlyIntoThatGoodNight, sunlightWindows.today.sunset);
  }

  function goGentlyIntoThatGoodNight() {
    setTimeOfDay(TimeOfDay.AfterSunset);
    console.log(sunlightWindows);
    util.setTimedEvent(brandNewDay, util.midnightAfter(sunlightWindows.today.sunset));
  }

  async function brandNewDay() {
    const todaysDate = new Date();
    const sunlightWindows = await fetchSunlightWindows(todaysDate);
    setSunlightWindows(sunlightWindows);
    setTimeOfDay(TimeOfDay.BeforeSunrise);
  }

  async function calibrateSundial() {
    const now = new Date();
    const sunlightWindows = await fetchSunlightWindows(now);
    sunlightWindows.today.sunset = new Date('December 29, 2018 18:33:50 GMT-0500')
    console.log(sunlightWindows);
    const timeOfDay = util.timeOfDay(now, sunlightWindows.today);
    setSunlightWindows(sunlightWindows);
    setTimeOfDay(timeOfDay);
    setCalibrated(true);
    switch (timeOfDay) {
      case TimeOfDay.BeforeSunrise:
        util.setTimedEvent(letThereBeLight, sunlightWindows.today.sunrise);
        break;
      case TimeOfDay.Day:
        util.setTimedEvent(goGentlyIntoThatGoodNight, sunlightWindows.today.sunset);
        break;
      case TimeOfDay.AfterSunset:
        util.setTimedEvent(brandNewDay, util.midnightAfter(sunlightWindows.today.sunset));
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