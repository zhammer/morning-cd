import React, { useState, useMemo, useEffect } from 'react';
import { Global } from '@emotion/core';
import api from './services/api';
import HelpModal from './components/HelpModal';
import FadeInFadeOut from './components/FadeInFadeOut';
import DayNightFrame from './scenes/DayNightFrame';
import ListensPage from './scenes/ListensPage';
import QuestionPage from './scenes/QuestionPage';
import SubmitSongPage from './scenes/SubmitSongPage';
import WindLoadingPage from './scenes/WindLoadingPage';
import useSundial from './hooks/useSundial';
import SundialContext from './hooks/useSundial/context';
import { Listen, Song, SunlightWindows } from './types';
import { globalStyles } from './App.styles';
import usePollingFunction from './hooks/usePollingFunction';
import useGetter from './hooks/useGetter';

const LISTENS_PAGE_SIZE = 10;
const LISTENS_POLL_SIZE = 100;
const LISTENS_POLL_INTERVAL = 10000;
const USER_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export default function App() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [listens, setListens] = useState<Listen[]>([]);
  const [newListens, setNewListens] = useState<Listen[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastSubmit, setLastSubmit] = useState(getDateFromLocalStorage('lastSubmit'))
  const [moreListensToFetch, setMoreListensToFetch] = useState(false);
  const [fetchingMoreListens, setFetchingMoreListens] = useState(false);

  const sundial = useSundial(
    fetchSunlightWindows,
    {
      onSunrise: handleSundialSunrise,
      onSunset: handleSundialSunset,
      onCalibrateToDay: handleSundialCalibratedToDay,
      onCalibrateToNight: handleSundialCalibratedToNight
    }
  );

  const allListens = useMemo(() => {
    return [...listens, ...newListens];
  }, [listens, newListens]);

  const firstListen = useMemo(() => {
      const numListens = allListens.length;
      return numListens > 0 ? allListens[0] : null;
  }, [allListens]);

  const lastListen = useMemo(() => {
    const numListens = allListens.length;
    return numListens > 0 ? allListens[numListens - 1] : null;
  }, [allListens]);

  const getLastListen = useGetter(lastListen);

  const userSubmittedListenToday = useMemo(() => {
    return lastSubmit && sundial.isDay && lastSubmit > sundial.lastSunrise
  }, [lastSubmit, sundial]);

  const showLoading = useMemo(() => {
    return loading || sundial.calibrating
  }, [loading, sundial]);

  const showListensPage = useMemo(() => {
    return !showLoading && (listens.length > 0 || !sundial.isDay)
  }, [showLoading, listens, sundial]);

  const showQuestionPage = useMemo(() => {
    return !showLoading && sundial.isDay && !selectedSong && listens.length === 0;
  }, [showLoading, sundial, selectedSong, listens]);

  const showSubmitSongPage = useMemo(() => {
    return !showLoading && sundial.isDay && !!selectedSong;
  }, [showLoading, sundial, selectedSong]);

  usePollingFunction(fetchNewListens, LISTENS_POLL_INTERVAL, showListensPage);

  // sundial event handlers
  function handleSundialCalibratedToDay() {
    userSubmittedListenToday ? fetchListens() : setLoading(false);
  }

  function handleSundialCalibratedToNight() {
    fetchListens();
  }

  function handleSundialSunrise() {
    setListens([]);
    setMoreListensToFetch(false);
  }

  function handleSundialSunset() {
    if (listens.length === 0) {
      fetchListens();
      setSelectedSong(null);
    }
  }

  /**
   * Caches api.fetchSunlightWindows responses in localStorage.
   */
  async function fetchSunlightWindows(date: Date) {
    const cacheKey = `'sunlightWindows-${date.toDateString()}-${USER_TIMEZONE}`;
    const cachedSunlightWindows = localStorage.getItem(cacheKey);
    if (cachedSunlightWindows) {
      try {
        return pluckCachedSunlightWindows(cachedSunlightWindows);;
      } catch(err) {
        console.warn(`Error plucking cachedSunlightWindows from cache. (key: ${cacheKey}, value: ${cachedSunlightWindows})`);
      }
    }
    const sunlightWindows = await api.fetchSunlightWindows(date, USER_TIMEZONE);
    localStorage.setItem(cacheKey, JSON.stringify(sunlightWindows));
    return sunlightWindows;
  }

  // morningcd api handlers
  async function fetchListens(setLoadingWhileFetching = true) {
    setLoadingWhileFetching && setLoading(true);
    const after = sundial.lastSunrise;
    const before = firstListen ? firstListen.listenTime : new Date();
    const { hasPreviousPage, listens: fetchedListens } = await api.fetchListens({ after, before, last: LISTENS_PAGE_SIZE });
    const nextListens = [ ...fetchedListens, ...(listens.length > 0 ? listens : []) ];
    setListens(nextListens);
    setLoading(false);
    setMoreListensToFetch(hasPreviousPage);
  }

  async function fetchNewListens() {
    const lastListen = getLastListen();
    const after = lastListen ? lastListen.listenTime : new Date();
    const { listens: polledListens } = await api.fetchListens({ after, first: LISTENS_POLL_SIZE });
    if (polledListens.length === 0) {
      return;
    }
    setNewListens(prevNewListens => [...prevNewListens, ...polledListens]);
  }

  function handleSongSelected(song: Song) {
    setSelectedSong(song);
  }

  async function handleSongSubmitted({ name, note }: { name: string, note: string }) {
    if (!selectedSong) {
      throw new Error('Attempted to submit a song, but no song was selected');
    }
    setLoading(true);
    const submittedListen = await api.submitListen(selectedSong.id, name, note, USER_TIMEZONE);
    const { listens, hasPreviousPage } = await api.fetchListens({
      after: sundial.lastSunrise,
      before: submittedListen.listenTime,
      last: LISTENS_PAGE_SIZE
    });
    const submitTime = new Date(); // this can come from listentime
    setListens([...listens, submittedListen]);
    setMoreListensToFetch(hasPreviousPage);
    setSelectedSong(null);
    setLoading(false);
    setLastSubmit(submitTime);
    localStorage.setItem('lastSubmit', submitTime.toString());
  }

  async function handleLastListenVisible() {
    if (moreListensToFetch) {
      setFetchingMoreListens(true);
      await fetchListens(false);
      setFetchingMoreListens(false);
    }
  }

  function showNewListens() {
    setListens(allListens);
    setNewListens([]);
  }

  return (
    <div>
      <Global styles={globalStyles} />
      <SundialContext.Provider value={sundial}>
        <DayNightFrame>
          <HelpModal />
          <FadeInFadeOut visible={showLoading} >
            <WindLoadingPage />
          </FadeInFadeOut>
          <FadeInFadeOut visible={showListensPage}>
            <ListensPage
              listens={listens}
              newListens={newListens}
              onLastListenVisible={handleLastListenVisible}
              loadingMore={fetchingMoreListens}
              onShowNewListensClicked={showNewListens}
              />
          </FadeInFadeOut>
          <FadeInFadeOut visible={showQuestionPage} >
            <QuestionPage searchSongs={api.searchSongs} onSongSelected={handleSongSelected} />
          </FadeInFadeOut>
          <FadeInFadeOut visible={showSubmitSongPage}>
            <SubmitSongPage
              song={selectedSong as Song} // hacky, cause FadeInFadeOut wont render if selectedSong is null
              onSongSubmitted={handleSongSubmitted}
            />
          </FadeInFadeOut>
        </DayNightFrame>
      </SundialContext.Provider>
    </div>
  )
}

function pluckCachedSunlightWindows(cachedString: string): SunlightWindows {
  const { yesterday, today, tomorrow } = JSON.parse(cachedString);
  return {
    yesterday: pluckCachedSunlightWindow(yesterday),
    today: pluckCachedSunlightWindow(today),
    tomorrow: pluckCachedSunlightWindow(tomorrow)
  }
}

function pluckCachedSunlightWindow(sunlightWindow: { sunrise: string, sunset: string }) {
  return {
    sunrise: dateFromUtcString(sunlightWindow.sunrise),
    sunset: dateFromUtcString(sunlightWindow.sunset)
  }
}

function getDateFromLocalStorage(fieldName: string): Date | null {
  const date = localStorage.getItem(fieldName);
  if (!date) {
    return null;
  }
  const dateTimeStamp = Date.parse(date);
  return new Date(dateTimeStamp);
}

function dateFromUtcString(utcString: string): Date {
  const [dateString, timeString] = utcString.split('T');
  const [fullYear, month, date] = dateString.split('-');
  const [hour, minute, second] = timeString.split(':');

  const utcDate = Date.UTC(parseInt(fullYear), parseInt(month) - 1, parseInt(date), parseInt(hour), parseInt(minute), parseInt(second));
  return new Date(utcDate);
};
