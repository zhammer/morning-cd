const setTimedEvent = (func, eventDateTime) => {
  const now = new Date();
  const millisecondsUntilEvent = eventDateTime.getTime() - now.getTime();
  if (millisecondsUntilEvent <= 0) {
    throw new Error('Must set timed event for an `eventDateTime` in the future.');
  }
  return setTimeout(func, millisecondsUntilEvent);
};

export default setTimedEvent;
