import React from 'react';
import { render, waitForElement, getByText } from 'react-testing-library';
import MockDate from 'mockdate';
import useSundial from './useSundial';
import { FetchSunlightWindows, SundialEventCallbacks, SunlightWindows, SunlightWindow } from './types';

describe('useSundial', () => {

  it('calibrates to day during the day', async () => {
    const delorean = createDelorean(new Date('August 4, 2001 12:30:00'));
    const sundialCallbackMock = createSundialCallbackMock();

    const { container } = render(
      <SundialUser fetchSunlightWindows={fetchSunlightWindows} sundialCallbacks={sundialCallbackMock.callbacks} />
    );
    const message = container.firstChild;
    expect(message).not.toBeUndefined();
    message && expect(message.textContent).toBe('calibrating...');
    await waitForElement(() => getByText(container, 'Day. Last Sunrise: ' + augustFourth.sunrise));
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(sundialCallbackMock.calls).toEqual(['onCalibrateToDay']);
  });

  it('calibrates to night before sunrise', async () => {
    const delorean = createDelorean(new Date('August 4, 2001 05:30:00'));
    const sundialCallbackMock = createSundialCallbackMock();

    const { container } = render(
      <SundialUser fetchSunlightWindows={fetchSunlightWindows} sundialCallbacks={sundialCallbackMock.callbacks} />
    );
    const message = container.firstChild;
    expect(message).not.toBeUndefined();
    message && expect(message.textContent).toBe('calibrating...');
    await waitForElement(() => getByText(container, 'Night. Last Sunrise: ' + augustThird.sunrise));
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(sundialCallbackMock.calls).toEqual(['onCalibrateToNight']);
  });

  it('calibrates to night after sunrise', async () => {
    const delorean = createDelorean(new Date('August 4, 2001 21:30:00'));
    const sundialCallbackMock = createSundialCallbackMock();

    const { container } = render(
      <SundialUser fetchSunlightWindows={fetchSunlightWindows} sundialCallbacks={sundialCallbackMock.callbacks} />
    );
    const message = container.firstChild;
    expect(message).not.toBeUndefined();
    message && expect(message.textContent).toBe('calibrating...');
    await waitForElement(() => getByText(container, 'Night. Last Sunrise: ' + augustFourth.sunrise));
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(sundialCallbackMock.calls).toEqual(['onCalibrateToNight']);
  });

  it('does the full day cycle, baby!', async () => {
    // issues with fakeTimers and react-testing-library right now
    // https://stackoverflow.com/questions/51126786/jest-fake-timers-with-promises/51132058#51132058
    // at the moment i'm just doing a hack where the day cycles super quickly (1 window a second).
    // unfortunately, this means the test tkes ~5 seconds to run.
    const delorean = createDelorean(new Date('August 4, 2001 23:59:59'));
    const sundialCallbackMock = createSundialCallbackMock();

    const { container } = render(
      <SundialUser fetchSunlightWindows={fetchSunlightWindowsRapid} sundialCallbacks={sundialCallbackMock.callbacks} />
    );
    const message = container.firstChild;
    expect(message).not.toBeUndefined();
    message && expect(message.textContent).toBe('calibrating...');
    await waitForElement(() => getByText(container, 'Night. Last Sunrise: ' + augustFourthRapid.sunrise));
    delorean.zoomTo(new Date('August 5, 2001 00:00:00'));
    await new Promise(resolve => setTimeout(resolve, 1000));
    await waitForElement(() => getByText(container, 'Night. Last Sunrise: ' + augustFourthRapid.sunrise));
    await waitForElement(() => getByText(container, 'Day. Last Sunrise: ' + augustFifthRapid.sunrise));
    await waitForElement(() => getByText(container, 'Night. Last Sunrise: ' + augustFifthRapid.sunrise));
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(sundialCallbackMock.calls).toEqual(['onCalibrateToNight', 'onNewDay', 'onSunrise', 'onSunset']);
  })

  describe('callback handlers run after state has been updated', () => {
    it('when calibrating to day', async () => {
      const delorean = createDelorean(new Date('August 4, 2001 12:30:00'));
      const callbacks = {
        onCalibrateToDay: jest.fn(onCalibrateToDay)
      }
      const { container } = render(
        <SundialUser fetchSunlightWindows={fetchSunlightWindows} sundialCallbacks={callbacks} />
      );
      expect(container.firstChild && container.firstChild.textContent).toEqual('calibrating...')
      function onCalibrateToDay() {
        expect(container.firstChild && container.firstChild.textContent).toEqual('Day. Last Sunrise: ' + augustFourth.sunrise)
      }
      await new Promise(resolve => setTimeout(resolve, 50));
      expect(callbacks.onCalibrateToDay).toBeCalledTimes(1);
    });

    it('when calibrating to before sunrise', async () => {
      const delorean = createDelorean(new Date('August 4, 2001 4:30:00'));
      const callbacks = { onCalibrateToNight: jest.fn(onCalibrateToNight) };
      const { container } = render(
        <SundialUser fetchSunlightWindows={fetchSunlightWindows} sundialCallbacks={callbacks} />
      );
      expect(container.firstChild && container.firstChild.textContent).toEqual('calibrating...')
      function onCalibrateToNight() {
        expect(container.firstChild && container.firstChild.textContent).toEqual('Night. Last Sunrise: ' + augustThird.sunrise)
      }
      await new Promise(resolve => setTimeout(resolve, 50));
      expect(callbacks.onCalibrateToNight).toBeCalledTimes(1);
    });

    it('when calibrating to after sunset', async () => {
      const delorean = createDelorean(new Date('August 4, 2001 20:30:00'));
      const callbacks = { onCalibrateToNight: jest.fn(onCalibrateToNight) };
      const { container } = render(
        <SundialUser fetchSunlightWindows={fetchSunlightWindows} sundialCallbacks={callbacks} />
      );
      expect(container.firstChild && container.firstChild.textContent).toEqual('calibrating...')
      function onCalibrateToNight() {
        expect(container.firstChild && container.firstChild.textContent).toEqual('Night. Last Sunrise: ' + augustFourth.sunrise)
      }
      await new Promise(resolve => setTimeout(resolve, 50));
      expect(callbacks.onCalibrateToNight).toBeCalledTimes(1);
    });

    it('when sun rises', async () => {
      const delorean = createDelorean(secondBefore(augustFourth.sunrise));
      const callbacks = { onSunrise: jest.fn(onSunrise) };
      const { container } = render(
        <SundialUser fetchSunlightWindows={fetchSunlightWindows} sundialCallbacks={callbacks} />
      );
      expect(container.firstChild && container.firstChild.textContent).toEqual('calibrating...');
      await waitForElement(() => getByText(container, 'Night. Last Sunrise: ' + augustThird.sunrise));
      function onSunrise() {
        expect(container.firstChild && container.firstChild.textContent).toEqual('Day. Last Sunrise: ' + augustFourth.sunrise)
      }
      await new Promise(resolve => setTimeout(resolve, 1050));
      expect(callbacks.onSunrise).toBeCalledTimes(1);
    });

    it('when sun sets', async () => {
      const delorean = createDelorean(secondBefore(augustFourth.sunset));
      const callbacks = { onSunset: jest.fn(onSunset) };
      const { container } = render(
        <SundialUser fetchSunlightWindows={fetchSunlightWindows} sundialCallbacks={callbacks} />
      );
      expect(container.firstChild && container.firstChild.textContent).toEqual('calibrating...');
      await waitForElement(() => getByText(container, 'Day. Last Sunrise: ' + augustFourth.sunrise));
      function onSunset() {
        expect(container.firstChild && container.firstChild.textContent).toEqual('Night. Last Sunrise: ' + augustFourth.sunrise)
      }
      await new Promise(resolve => setTimeout(resolve, 1050));
      expect(callbacks.onSunset).toBeCalledTimes(1);
    });

    it.skip('when new day begins', async () => {
      const delorean = createDelorean(new Date('August 4, 2001 23:59:59'));
      const callbacks = { onNewDay: jest.fn(onNewDay) };
      const { container } = render(
        <SundialUser fetchSunlightWindows={fetchSunlightWindows} sundialCallbacks={callbacks} />
      );
      expect(container.firstChild && container.firstChild.textContent).toEqual('calibrating...');
      await waitForElement(() => getByText(container, 'Night. Last Sunrise: ' + augustFourth.sunrise));
      function onNewDay() {
        expect(container.firstChild && container.firstChild.textContent).toEqual('Night. Last Sunrise: ' + augustFourth.sunrise)
      }
      await new Promise(resolve => setTimeout(resolve, 1050));
      expect(callbacks.onNewDay).toBeCalledTimes(1);
    });


  })
})

function secondBefore(date: Date): Date {
  return new Date(date.getTime() - 1e3);
}

async function fetchSunlightWindowsRapid(today: Date): Promise<SunlightWindows> {

  if (today.toString().startsWith('Sat Aug 04')) {
    return {
      yesterday: augustThird,
      today: augustFourthRapid,
      tomorrow: augustFifthRapid
    }
  }
  else if (today.toString().startsWith('Sun Aug 05')) {
    return {
      yesterday: augustFourthRapid,
      today: augustFifthRapid,
      tomorrow: augustSixth
    }
  }
  else {
    throw `mock fetchSunlightWindowsRapid only supports 2001-08-04 or 2001-08-05, not ${today}`;
  }
}

async function fetchSunlightWindows(today: Date): Promise<SunlightWindows> {
  if (today.toString().startsWith('Sat Aug 04')) {
    return {
      yesterday: augustThird,
      today: augustFourth,
      tomorrow: augustFifth
    }
  }
  else if (today.toString().startsWith('Sun Aug 05')) {
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
  sunrise: new Date('August 6, 2001 06:22:00'),
  sunset: new Date('August 6, 2001 19:49:00')
}

const augustFourthRapid: SunlightWindow = {
  sunrise: new Date('August 4, 2001 06:21:00'),
  sunset: new Date('August 4, 2001 23:59:58')
}

const augustFifthRapid: SunlightWindow = {
  sunrise: new Date('August 5, 2001 00:00:01'),
  sunset: new Date('August 5, 2001 00:00:02')
}

interface SundialCallbackMock {
  callbacks: SundialEventCallbacks;
  calls: string[];
}

function createSundialCallbackMock(): SundialCallbackMock {
  let calls: string[] = [];
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
    // jest.advanceTimersByTime(millisecondsToZoom);
  }

  return { zoomTo };
}
