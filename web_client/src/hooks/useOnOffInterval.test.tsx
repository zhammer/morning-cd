import React from 'react';
import useOnOffInterval from './useOnOffInterval';
import { render } from 'react-testing-library';

function OnOffIntervalUser({ intervalMs, on, callback }: { intervalMs: number, on: boolean, callback: Function }) {
  useOnOffInterval(callback, intervalMs, on);
  return <div />
}

describe('useOnOffInterval', () => {

  it('doesnt run interval when initally set to off', async () => {
    const callback = jest.fn();
    render(
      <OnOffIntervalUser intervalMs={10} on={false} callback={callback} />
    );
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(callback.mock.calls.length).toBe(0);
  });

  it('runs when interval initially set to on', async () => {
    const callback = jest.fn();
    render(
      <OnOffIntervalUser intervalMs={10} on={true} callback={callback} />
    );
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(callback.mock.calls.length).toBeOneOf([8, 9]);
  });

  it('turns off when set to off after being set to on', async () => {
    const callback = jest.fn();
    const { rerender } = render(
      <OnOffIntervalUser intervalMs={10} on={true} callback={callback} />
    );
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(callback.mock.calls.length).toBeOneOf([8, 9]);
    const lastCount = callback.mock.calls.length;
    rerender(
      <OnOffIntervalUser intervalMs={10} on={false} callback={callback} />
    );

    await new Promise(resolve => setTimeout(resolve, 100));
    expect(callback.mock.calls.length - lastCount).toBeOneOf([0, 1]);
  });

   it('turns on when set to on after being set to off', async () => {
    const callback = jest.fn();
    const { rerender } = render(
      <OnOffIntervalUser intervalMs={10} on={false} callback={callback} />
    );
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(callback.mock.calls.length).toBe(0);
    rerender(
      <OnOffIntervalUser intervalMs={10} on={true} callback={callback} />
    );
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(callback.mock.calls.length).toBeOneOf([8, 9]);
  });

  it('updates intervalMs on the fly while interval is on', async () => {
    const callback = jest.fn();
    const { rerender } = render(
      <OnOffIntervalUser intervalMs={10} on={true} callback={callback} />
    );
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(callback.mock.calls.length).toBeOneOf([8, 9]);
    const lastCount = callback.mock.calls.length;
    rerender(
      <OnOffIntervalUser intervalMs={20} on={true} callback={callback} />
    );
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(callback.mock.calls.length - lastCount).toBeOneOf([4, 5]);
  });

 it('updates intervalMs while interval is off', async () => {
    const callback = jest.fn();
    const { rerender } = render(
      <OnOffIntervalUser intervalMs={10} on={true} callback={callback} />
    );
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(callback.mock.calls.length).toBeOneOf([8, 9]);
    const lastCount = callback.mock.calls.length;
    rerender(
      <OnOffIntervalUser intervalMs={10} on={false} callback={callback} />
    );
    rerender(
      <OnOffIntervalUser intervalMs={20} on={false} callback={callback} />
    );
    rerender(
      <OnOffIntervalUser intervalMs={20} on={true} callback={callback} />
    );
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(callback.mock.calls.length - lastCount).toBeOneOf([4, 5]);
  });
});
