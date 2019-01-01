import React, { useState } from 'react';
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
import { Listen, Song } from './types';

const LISTENS_PAGE_SIZE = 10;
const USER_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export default function App() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [listens, setListens] = useState<Listen[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastSubmit, setLastSubmit] = useState(getDateFromLocalStorage('lastSubmit'))
  const [moreListensToFetch, setMoreListensToFetch] = useState(false);
  const sundial = useSundial(
    date => api.fetchSunlightWindows(date, USER_TIMEZONE),
    {
      onSunrise: handleSundialSunrise,
      onSunset: handleSundialSunset,
      onCalibrateToDay: handleSundialCalibratedToDay,
      onCalibrateToNight: handleSundialCalibratedToNight
    }
  );

  // sundial event handlers
  function handleSundialCalibratedToDay() {
    userSubmittedListenToday() ? fetchListens() : setLoading(false);
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

  // morningcd api handlers
  async function fetchListens(setLoadingWhileFetching = true) {
    setLoadingWhileFetching && setLoading(true);
    const after = sundial.lastSunrise;
    const before = (listens.length > 0) ? listens[0].listenTimeUtc : new Date();
    const { hasPreviousPage, listens: fetchedListens } = await api.fetchListens(after, before, LISTENS_PAGE_SIZE);
    const nextListens = [ ...fetchedListens, ...(listens.length > 0 ? listens : []) ];
    setListens(nextListens);
    setLoading(false);
    setMoreListensToFetch(hasPreviousPage);
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
    const { listens, hasPreviousPage } = await api.fetchListens(
      sundial.lastSunrise,
      submittedListen.listenTimeUtc,
      LISTENS_PAGE_SIZE
    )
    const submitTime = new Date(); // this can come from listentimeutc
    setListens([...listens, submittedListen]);
    setMoreListensToFetch(hasPreviousPage);
    setSelectedSong(null);
    setLoading(false);
    setLastSubmit(submitTime);
    localStorage.setItem('lastSubmit', submitTime.toString());
  }

  function userSubmittedListenToday() {
    return lastSubmit && sundial.isDay && lastSubmit > sundial.lastSunrise;
  }

  function handleLastListenVisible() {
    if (moreListensToFetch) {
      fetchListens(false);
    }
  }

  // render helpers
  function showLoading(): boolean {
    return loading || sundial.calibrating;
  }
  function showListensPage(): boolean {
    return !showLoading() && (listens.length > 0 || !sundial.isDay);
  }
  function showQuestionPage(): boolean {
    return !showLoading() && sundial.isDay && !selectedSong && listens.length === 0;
  }
  function showSubmitSongPage(): boolean {
    return !showLoading() && sundial.isDay && !!selectedSong;
  }

  return (
    <div>
      <SundialContext.Provider value={sundial}>
        <DayNightFrame>
          <HelpModal />
          <FadeInFadeOut visible={showLoading()} >
            <WindLoadingPage />
          </FadeInFadeOut>
          <FadeInFadeOut visible={showListensPage()}>
            <ListensPage listens={listens} onLastListenVisible={handleLastListenVisible} />
          </FadeInFadeOut>
          <FadeInFadeOut visible={showQuestionPage()} >
            <QuestionPage searchSongs={api.searchSongs} onSongSelected={handleSongSelected} />
          </FadeInFadeOut>
          <FadeInFadeOut visible={showSubmitSongPage()}>
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

function getDateFromLocalStorage(fieldName: string): Date | null {
  const date = localStorage.getItem(fieldName);
  if (!date) {
    return null;
  }
  const dateTimeStamp = Date.parse(date);
  return new Date(dateTimeStamp);
}