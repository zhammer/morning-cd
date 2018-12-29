import React, { useState } from 'react';
import api from 'services/api';
import HelpModal from 'components/HelpModal';
import FadeInFadeOut from 'components/FadeInFadeOut';
import DayNightFrame from 'scenes/DayNightFrame';
import ListensPage from 'scenes/ListensPage';
import QuestionPage from 'scenes/QuestionPage';
import SubmitSongPage from 'scenes/SubmitSongPage';
import WindLoadingPage from 'scenes/WindLoadingPage';
import useSundial from './hooks/useSundial';
import { SundialProvider } from './components/withSundial/context';


const LISTENS_PAGE_SIZE = 10;
const USER_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export default function App() {
  const [selectedSong, setSelectedSong] = useState(null);
  const [listens, setListens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastSubmit, setLastSubmit] = useState(getDateFromLocalStorage('lastSubmit'))
  const [moreListensToFetch, setMoreListensToFetch] = useState(null);
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
    userSubmittedListenToday() ? fetchListens() : setLoading(true);
  }
  function handleSundialCalibratedToNight() {
    fetchListens();
  }
  function handleSundialSunrise() {
    setListens([]);
    setMoreListensToFetch(null);
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
    const { hasPreviousPage, fetchedListens } = await api.fetchListens(after, before, LISTENS_PAGE_SIZE);
    const nextListens = [ ...fetchedListens, ...(listens.length > 0 ? listens : []) ];
    setListens(nextListens);
    setLoading(false);
    setMoreListensToFetch(hasPreviousPage);
  }
  function handleSongSelected(song) {
    setSelectedSong(song);
  }
  async function handleSongSubmitted({ name, note }) {
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
    localStorage.setItem('lastSubmit', submitTime);
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
  function showLoading() {
    return loading || sundial.calibrating;
  }
  function showListensPage() {
    return !showLoading() && (listens.length > 0 || sundial.isDay);
  }
  function showQuestionPage() {
    return !showLoading() && sundial.isDay && !selectedSong && listens.length === 0;
  }
  function showSubmitSongPage() {
    return !showLoading() && sundial.isDay && selectedSong;
  }

  return (
    <div>
      <SundialProvider value={sundial}>
        <DayNightFrame>
          <HelpModal />
          <FadeInFadeOut visible={showLoading()} >
            <WindLoadingPage />
          </FadeInFadeOut>
          <FadeInFadeOut visible={showListensPage()}>
            <ListensPage listens={listens} onLastListenVisible={handleLastListenVisible} />
          </FadeInFadeOut>
          <FadeInFadeOut visible={showQuestionPage()} >
            <QuestionPage onSongSelected={handleSongSelected} />
          </FadeInFadeOut>
          <FadeInFadeOut visible={showSubmitSongPage()}>
            <SubmitSongPage
              song={selectedSong}
              onSongSubmitted={handleSongSubmitted}
            />
          </FadeInFadeOut>
        </DayNightFrame>
      </SundialProvider>
    </div>
  )
}

function getDateFromLocalStorage(fieldName) {
  return (localStorage.getItem(fieldName) &&
    Date.parse(localStorage.getItem(fieldName)));
}