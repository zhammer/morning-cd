/**
 *  An HOC that provides orientation about sunrise and sunset to a component.
 *
 *  "A gnomon ([ˈnoʊmɒn], from Greek γνώμων, gnōmōn, literally: "one that knows or examines"[1][2])
 *  is the part of a sundial that casts a shadow." - Wikipedia
 */
import React, { Component } from 'react';
import setTimedEvent from 'util/setTimedEvent';
import util from './util';


const makeSundialPropsFromState = state => ({
  calibrating: !state.sundialCalibrated,
  isDay: state.timeOfDay === util.DAY,
  lastSunrise: (state.timeOfDay === util.BEFORE_SUNRISE) ? state.yesterday.sunrise : state.today.sunrise
});


const withSundial = fetchSunlightWindows => WrappedComponent => (
  class extends Component {
    state = {
      yesterday: {
        sunrise: null,
        sunset: null
      },
      today: {
        sunrise: null,
        sunset: null
      },
      tomorrow: {
        sunrise: null,
        sunset: null
      },
      timeOfDay: null,
      sundialCalibrated: false
    }

    letThereBeLight = () => {
      this.setState({ timeOfDay: util.DAY });
      setTimedEvent(this.goGentlyIntoThatGoodNight, this.state.today.sunset);
    }

    goGentlyIntoThatGoodNight = () => {
      this.setState({ timeOfDay: util.AFTER_SUNSET });
      setTimedEvent(this.brandNewDay, util.midnightAfter(this.state.today.sunset));
    }

    brandNewDay = async () => {
      const todaysDate = new Date();
      const { yesterday, today, tomorrow } = await fetchSunlightWindows(todaysDate);
      this.setState({ yesterday, today, tomorrow, timeOfDay: util.BEFORE_SUNRISE });
      setTimedEvent(this.letThereBeLight, today.sunrise);
    }

    componentDidMount = async () => {
      const now = new Date();
      const { yesterday, today, tomorrow } = await fetchSunlightWindows(now);
      const timeOfDay = util.timeOfDay(now, today);

      this.setState({ yesterday, today, tomorrow, timeOfDay, sundialCalibrated: true });

      switch (timeOfDay) {
        case util.BEFORE_SUNRISE:
          setTimedEvent(this.letThereBeLight, today.sunrise);
          break;

        case util.DAY:
          setTimedEvent(this.goGentlyIntoThatGoodNight, today.sunset);
          break;

        case util.AFTER_SUNSET:
          setTimedEvent(this.brandNewDay, util.midnightAfter(today.sunset));
          break;

        default:
          throw new Error(`Unexpected timeOfDay: "${timeOfDay}"`);
      }
    }

    render = () => {
      const sundialProps = makeSundialPropsFromState(this.state);
      return (
        <WrappedComponent sundial={sundialProps} {...this.props} />
      );
    }
  }
);

export default withSundial;
