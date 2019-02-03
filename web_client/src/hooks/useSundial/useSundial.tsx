import { useMemo } from 'react';
import util from './util';
import {
  FetchSunlightWindows,
  SunlightWindows,
  TimeOfDay,
  Sundial,
  SundialEventCallbacks
} from './types';
import { assign, Machine, send } from 'xstate';
import useMachine from '../useMachine';

interface SundialMachineContext {
  sunlightWindows: SunlightWindows;
}

const sundialMachine = Machine<SundialMachineContext>({
  id: 'sundial',
  initial: 'calibrating',
  states: {
    calibrating: {
      initial: 'fetchingSunlightWindows',
      states: {
        fetchingSunlightWindows: {
          invoke: {
            src: 'fetchSunlightWindows',
            onDone: {
              target: 'fetchedSunlightWindows',
              actions: assign<SundialMachineContext>({sunlightWindows: (_, event) => event.data}),
            }
          },
        },
        fetchedSunlightWindows: {
          onEntry: send(ctx => {
            switch (util.timeOfDay(new Date(), ctx.sunlightWindows.today)) {
              case TimeOfDay.BeforeSunrise:
                return 'CALIBRATE_TO_BEFORE_SUNRISE';
              case TimeOfDay.Day:
                return 'CALIBRATE_TO_DAY';
              case TimeOfDay.AfterSunset:
                return 'CALIBRATE_TO_AFTER_SUNSET';
            }
          }),
          on: {
            CALIBRATE_TO_BEFORE_SUNRISE: '#sundial.calibrated.beforeSunrise.fromCalibrate',
            CALIBRATE_TO_DAY: '#sundial.calibrated.day.fromCalibrate',
            CALIBRATE_TO_AFTER_SUNSET: '#sundial.calibrated.afterSunset.fromCalibrate',
          }
        },
      }
    },
    calibrated: {
      states: {
        beforeSunrise: {
          initial: 'fromPreviousPhase',
          onEntry: send('SEND_CALLBACK', { delay: 0 }),
          states: {
            fromCalibrate: {
              on: {
                SEND_CALLBACK: { actions: 'onCalibrateToNight' }
              }
            },
            fromPreviousPhase: {
              on: {
                SEND_CALLBACK: { actions: 'onNewDay' }
              }
            }
          },
          invoke: {
            src: 'fetchSunlightWindows',
            onDone: {
              actions: [
                assign<SundialMachineContext>({sunlightWindows: (_, event) => event.data}),
                send('SUNRISE', {
                  delay: (ctx, _) => ctx.sunlightWindows.today.sunrise.getTime() - (new Date()).getTime()
                }),
              ]
            }
          },
          on: {
            SUNRISE: 'day',
          },
        },
        day: {
          initial: 'fromPreviousPhase',
          states: {
            fromCalibrate: {
              on: {
                SEND_CALLBACK: { actions: 'onCalibrateToDay' }
              }
            },
            fromPreviousPhase: {
              on: {
                SEND_CALLBACK: { actions: 'onSunrise' }
              }
            }
          },
          onEntry: [
            send('SUNSET', {
              delay: (ctx, _) => ctx.sunlightWindows.today.sunset.getTime() - (new Date()).getTime()
            }),
            send('SEND_CALLBACK', { delay: 0 })
          ],
          on: {
            SUNSET: 'afterSunset',
          }
        },
        afterSunset: {
          initial: 'fromPreviousPhase',
          states: {
            fromCalibrate: {
              on: {
                SEND_CALLBACK: { actions: 'onCalibrateToNight' }
              }
            },
            fromPreviousPhase: {
              on: {
                SEND_CALLBACK: { actions: 'onSunset' }
              }
            }
          },
          onEntry: [
            send('MIDNIGHT', {
              delay: (ctx, _) => util.midnightAfter(ctx.sunlightWindows.today.sunset).getTime() - (new Date()).getTime()
            }),
            send('SEND_CALLBACK', { delay: 0 })
          ],
          on: {
            MIDNIGHT: 'beforeSunrise',
          }
        }
      }
    }
  }
});

const noop = () => {};

/**
 * A sundial that is aware of the current time of day. The sundial is valid once `calibrated` is true.
 * @param fetchSunlightWindows Asynchronous function that fetches yesterday, today and tomorrow sunlight windows given today's date.
 * @param callbacks Some callbacks that will be invoked as the sundial calibrates and changes phase of day.
 */
export default function useSundial(
  fetchSunlightWindows: FetchSunlightWindows,
  callbacks: SundialEventCallbacks
): Sundial {
  const [machine] = useMachine(
    sundialMachine.withConfig({
      actions: {
        onSunrise: callbacks.onSunrise || noop,
        onSunset: callbacks.onSunset || noop,
        onNewDay: callbacks.onNewDay || noop,
        onCalibrateToDay: callbacks.onCalibrateToDay || noop,
        onCalibrateToNight: callbacks.onCalibrateToNight || noop
      },
      services: {
        fetchSunlightWindows: async () => await fetchSunlightWindows(new Date())
      }
    }).withContext({
      sunlightWindows: initialSunlightWindows
    })
  );
  const calibrated = useMemo(() => machine.matches('calibrated'), [machine.value]);
  const timeOfDay = useMemo(() => {
    if (machine.matches('calibrated.beforeSunrise')) {
      return TimeOfDay.BeforeSunrise;
    } else if (machine.matches('calibrated.day')) {
      return TimeOfDay.Day;
    } else {
      return TimeOfDay.AfterSunset;
    }
  }, [machine.value]);
  const sunlightWindows = useMemo(() => machine.context.sunlightWindows, [machine.context.sunlightWindows]);

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
};

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
