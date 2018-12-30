import React from 'react';
import { render, waitForElement, getByText } from 'react-testing-library';
import MockDate from 'mockdate';
import useSundial from './useSundial';
import { FetchSunlightWindows, SundialEventCallbacks, SunlightWindows, SunlightWindow } from './types';
import { timeout } from 'q';

describe('component using useSundial', () => {

  it('calibrates to day during the day', async () => {
    const delorean = createDelorean(new Date('August 4, 12:30:00'));
    const sundialCallbackMock = createSundialCallbackMock();

    const { container } = render(
      <SundialUser fetchSunlightWindows={fetchSunlightWindows} sundialCallbacks={sundialCallbackMock.callbacks} />
    );
    const message = container.firstChild;
    expect(message).not.toBeUndefined();
    message && expect(message.textContent).toBe('calibrating...');
    await waitForElement(() => getByText(container, 'Day. Last Sunrise: ' + augustFourth.sunrise));
    expect(sundialCallbackMock.calls).toEqual(['onCalibrateToDay']);
  });

  it('calibrates to night before sunrise', async () => {
    const delorean = createDelorean(new Date('August 4, 05:30:00'));
    const sundialCallbackMock = createSundialCallbackMock();

    const { container } = render(
      <SundialUser fetchSunlightWindows={fetchSunlightWindows} sundialCallbacks={sundialCallbackMock.callbacks} />
    );
    const message = container.firstChild;
    expect(message).not.toBeUndefined();
    message && expect(message.textContent).toBe('calibrating...');
    await waitForElement(() => getByText(container, 'Night. Last Sunrise: ' + augustThird.sunrise));
    expect(sundialCallbackMock.calls).toEqual(['onCalibrateToNight']);
  });

  it('calibrates to night after sunrise', async () => {
    const delorean = createDelorean(new Date('August 4, 21:30:00'));
    const sundialCallbackMock = createSundialCallbackMock();

    const { container } = render(
      <SundialUser fetchSunlightWindows={fetchSunlightWindows} sundialCallbacks={sundialCallbackMock.callbacks} />
    );
    const message = container.firstChild;
    expect(message).not.toBeUndefined();
    message && expect(message.textContent).toBe('calibrating...');
    await waitForElement(() => getByText(container, 'Night. Last Sunrise: ' + augustFourth.sunrise));
    expect(sundialCallbackMock.calls).toEqual(['onCalibrateToNight']);
  });

})

async function fetchSunlightWindows(today: Date): Promise<SunlightWindows> {
  const isoString = today.toISOString();
  
  if (isoString.startsWith('2001-08-04')) {
    return {
      yesterday: augustThird,
      today: augustFourth,
      tomorrow: augustFifth
    }
  }
  else if (isoString.startsWith('2001-08-05')) {
    return {
      yesterday: augustFourth,
      today: augustFifth,
      tomorrow: augustSixth
    }
  }
  else {
    throw `mock fetchSunlightWindows only supports 2001-08-04 or 2001-08-05, not ${today}`;
  }
}

const augustThird: SunlightWindow = {
  sunrise: new Date('August 3, 2001 06:21:00'),
  sunset: new Date('August 3, 2001 19:52:00')
}

const augustFourth: SunlightWindow = {
  sunrise: new Date('August 4, 2001 06:21:00'),
  sunset: new Date('August 4, 2001 19:51:00')
}

const augustFifth: SunlightWindow = {
  sunrise: new Date('August 5, 2001 06:22:00'),
  sunset: new Date('August 5, 2001 19:50:00')
}

const augustSixth: SunlightWindow = {
  sunrise: new Date('August 4, 2001 06:22:00'),
  sunset: new Date('August 4, 2001 19:49:00')
}

interface SundialCallbackMock {
  callbacks: SundialEventCallbacks;
  calls: Array<string>;
}

function createSundialCallbackMock(): SundialCallbackMock {
  let calls: Array<string> = [];
  const callbacks: SundialEventCallbacks = {
    onSunrise: () => calls.push('onSunrise'),
    onSunset: () => calls.push('onSunset'),
    onNewDay: () => calls.push('onNewDay'),
    onCalibrateToDay: () => calls.push('onCalibrateToDay'),
    onCalibrateToNight: () => calls.push('onCalibrateToNight')
  }
  return { calls, callbacks }
}

interface SundialUserProps {
  fetchSunlightWindows: FetchSunlightWindows;
  sundialCallbacks: SundialEventCallbacks;
}

function SundialUser({ fetchSunlightWindows, sundialCallbacks }: SundialUserProps) {
  const sundial = useSundial(fetchSunlightWindows, sundialCallbacks);

  return (
    sundial.calibrating ? <div>calibrating...</div> : (
      <div>{sundial.isDay ? 'Day' : 'Night'}. Last Sunrise: {sundial.lastSunrise.toString()}</div>
    )
  )
}

interface Delorean {
  zoomTo: (newTime: Date) => void;
}

function createDelorean(initialTime: Date): Delorean {
  MockDate.reset();
  let currentTime = initialTime;
  MockDate.set(currentTime.toString());

  function zoomTo(newTime: Date) {
    const millisecondsToZoom = newTime.getTime() - currentTime.getTime();
    if (!(millisecondsToZoom > 0)) {
      throw `newTime ${newTime} must be after currentTime ${currentTime}.`
    }
    currentTime = newTime;
    MockDate.set(currentTime.toString());
    jest.advanceTimersByTime(millisecondsToZoom);
  }

  return { zoomTo };
}