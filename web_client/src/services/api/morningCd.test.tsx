import { dateFromUtcString } from './morningCd';

describe('dateFromUtcString', () => {
  it('parses a utc date', () => {
    const utcString = '2019-01-12T21:46:37.541969';
    const date = dateFromUtcString(utcString);
    expect(date.toISOString()).toEqual('2019-01-12T21:46:37.541Z');
  });

  it('parses a utc date without milliseconds', () => {
    const utcString ='2019-01-12T12:18:44';
    const date = dateFromUtcString(utcString);
    expect(date.toISOString()).toEqual('2019-01-12T12:18:44.000Z');
  })
})