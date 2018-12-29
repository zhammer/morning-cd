import React, { Component } from 'react';
import api from 'services/api';
import withSundial from 'components/withSundial';
import { SundialProvider } from 'components/withSundial/context';
import {
  sundialEventFromUpdate,
  SUNDIAL_CALIBRATED_TO_DAY,
  SUNDIAL_CALIBRATED_TO_NIGHT,
  SUNDIAL_TURNED_TO_NIGHT_FROM_DAY,
  SUNDIAL_TURNED_TO_DAY_FROM_NIGHT
} from 'components/withSundial/lifecycle';
import HelpModal from 'components/HelpModal';
import FadeInFadeOut from 'components/FadeInFadeOut';
import DayNightFrame from 'scenes/DayNightFrame';
import ListensPage from 'scenes/ListensPage';
import QuestionPage from 'scenes/QuestionPage';
import SubmitSongPage from 'scenes/SubmitSongPage';
import WindLoadingPage from 'scenes/WindLoadingPage';


const LISTENS_PAGE_SIZE = 10;
const LAST_SUBMIT_LOCAL_STORAGE = 'lastSubmit';

const getDateFromLocalStorage = fieldName => (localStorage.getItem(fieldName) &&
                                              Date.parse(localStorage.getItem(fieldName)));

const getTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;


class App extends Component {
  state = {
    selectedSong: null,
    listens: [],
    loading: true,
    lastSubmit: getDateFromLocalStorage(LAST_SUBMIT_LOCAL_STORAGE),
    moreListensToFetch: null
  };

  fetchListens = async (setLoading = true) => {
    this.setLoading && this.setState({ loading: true });
    const after = this.props.sundial.lastSunrise;
    const before = (this.state.listens.length > 0) ? this.state.listens[0].listenTimeUtc : new Date();
    const { hasPreviousPage, listens } = await api.fetchListens(after, before, LISTENS_PAGE_SIZE);
    const nextListens = [ ...listens, ...(this.state.listens.length > 0 ? this.state.listens : []) ];
    this.setState({ listens: nextListens, loading: false, moreListensToFetch: hasPreviousPage });
  }

  sundialCalibratedToDay = () => {
    if (!this.userSubmittedListenToday()) {
      this.setState({ loading: false });
    }
    else {
      this.fetchListens();
    }
  }

  sundialCalibratedToNight = () => {
    this.fetchListens();
  }

  sundialTurnedToNightFromDay = async () => {
    if (this.state.listens.length === 0) {
      await this.fetchListens();
      this.setState({ selectedSong: null });
    }
  }

  sundialTurnedToDayFromNight = async () => {
    this.setState({ listens: [], moreListensToFetch: null });
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const sundialEvent = sundialEventFromUpdate(prevProps.sundial, this.props.sundial);
    if (sundialEvent) {
      switch (sundialEvent) {
        case SUNDIAL_CALIBRATED_TO_DAY:
          this.sundialCalibratedToDay();
          break;

        case SUNDIAL_CALIBRATED_TO_NIGHT:
          this.sundialCalibratedToNight();
          break;

        case SUNDIAL_TURNED_TO_NIGHT_FROM_DAY:
          this.sundialTurnedToNightFromDay();
          break;

        case SUNDIAL_TURNED_TO_DAY_FROM_NIGHT:
          this.sundialTurnedToDayFromNight();
          break;

        default:
          break;
      }
    }
  }

  handleSongSelected = song => {
    this.setState({ selectedSong: song });
  };

  handleSongSubmitted = async ({ name, note }) => {
    this.setState({ loading: true });
    const { sundial } = this.props;
    const song = this.state.selectedSong;
    const submittedListen = await api.submitListen(song.id, name, note, getTimezone());
    const { listens, hasPreviousPage } = await api.fetchListens(
      sundial.lastSunrise,
      submittedListen.listenTimeUtc,
      LISTENS_PAGE_SIZE
    );
    this.setState({
      listens: [ ...listens, submittedListen ],
      hasPreviousPage,
      selectedSong: null,
      loading: false
    });
    localStorage.setItem(LAST_SUBMIT_LOCAL_STORAGE, new Date());
  };

  userSubmittedListenToday = () => (
    this.state.lastSubmit
      && this.props.sundial.isDay
      && this.state.lastSubmit > this.props.sundial.lastSunrise
  );

  handleLastListenVisible = () => {
    if (this.state.moreListensToFetch) {
      this.fetchListens(false);
    }
  };

  // functions to determine if certain components are visible
  showLoading = () => this.state.loading || this.props.sundial.calibrating;
  showListensPage = () => (
    !this.showLoading() && (this.state.listens.length > 0 || !this.props.sundial.isDay)
  );
  showQuestionPage = () => (
    !this.showLoading() &&
      this.props.sundial.isDay &&
      !this.state.selectedSong &&
      this.state.listens.length === 0
  )
  showSubmitSongPage = () => (
    !this.showLoading() && this.props.sundial.isDay && this.state.selectedSong
  );

  render = () => {
    const { sundial } = this.props;
    const { selectedSong, listens } = this.state;
    return (
      <div>
        <SundialProvider value={sundial}>
          <DayNightFrame>
            <HelpModal />
            <FadeInFadeOut visible={this.showLoading()} >
              <WindLoadingPage />
            </FadeInFadeOut>
            <FadeInFadeOut visible={this.showListensPage()}>
              <ListensPage listens={listens} onLastListenVisible={this.handleLastListenVisible} />
            </FadeInFadeOut>
            <FadeInFadeOut visible={this.showQuestionPage()} >
              <QuestionPage onSongSelected={this.handleSongSelected} />
            </FadeInFadeOut>
            <FadeInFadeOut visible={this.showSubmitSongPage()}>
            <SubmitSongPage
              song={selectedSong}
              onSongSubmitted={this.handleSongSubmitted}
              />
            </FadeInFadeOut>
          </DayNightFrame>
        </SundialProvider>
      </div>
    );
  };
}

export default withSundial(date =>
  api.fetchSunlightWindows(
    date,
    getTimezone()
  )
)(App);
