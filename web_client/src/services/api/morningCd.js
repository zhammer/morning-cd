import { request as graphQlRequest } from 'graphql-request';
import request from 'superagent';

const BASE = process.env.REACT_APP_API_ENDPOINT;
const GRAPHQL_BASE = BASE + '/graphql';

export async function fetchSpotifyAccessToken () {
  const response = await request.get(BASE + '/accesstoken');
  return response.body.accessToken;
};


export const fetchListens = async (after, before, last) => {
  const variables = buildFetchListensVariables(after, before, last);
  const response = await graphQlRequest(GRAPHQL_BASE, ALL_LISTENS_QUERY, variables);
  return pluckRelayListens(response);
};


export const fetchSunlightWindows = async (today, ianaTimezone) => {
  const variables = buildFetchSunlightWindowsVariables(today, ianaTimezone);
  const response = await graphQlRequest(GRAPHQL_BASE, SUNLIGHT_WINDOWS_QUERY, variables);
  return pluckSunlightWindows(response);

};


export const submitListen = async (songId, listenerName, note, ianaTimezone) => {
  const variables = {
    listenInput: {
      songId,
      listenerName,
      note,
      ianaTimezone
    }
  };
  const response = await graphQlRequest(GRAPHQL_BASE, SUBMIT_LISTEN_MUTATION, variables);
  return pluckListen(response.submitListen);
};


export const ALL_LISTENS_QUERY = `
query allListens($after: DateTime, $before: DateTime, $last: Int) {
  allListens(after: $after, before: $before, last: $last) {
    pageInfo { hasPreviousPage }
    edges {
      listen: node {
        id
        listenerName
        listenTimeUtc
        note
        ianaTimezone
        song {
          id
          name
          artist: artistName
          album: albumName
          imageLargeUrl
          imageMediumUrl
          imageSmallUrl
        }
      }
    }
  }
}
`;


export const SUBMIT_LISTEN_MUTATION = `
mutation submit($listenInput: GraphQlListenInput!) {
  submitListen(input: $listenInput) {
    id
    listenerName
    listenTimeUtc
    note
    ianaTimezone
    song {
      id
      name
      artist: artistName
      album: albumName
      imageLargeUrl
      imageMediumUrl
      imageSmallUrl
    }
  }
}
`;

export const SUNLIGHT_WINDOWS_QUERY = `
query sunlightWindows (
  $ianaTimezone: String!
  $yesterdayDate: Date!
  $todayDate: Date!
  $tomorrowDate: Date!
) {
  yesterday: sunlightWindow(ianaTimezone: $ianaTimezone, onDate: $yesterdayDate) {
    sunriseUtc
    sunsetUtc
  }
  today: sunlightWindow(ianaTimezone: $ianaTimezone, onDate: $todayDate) {
    sunriseUtc
    sunsetUtc
  }
  tomorrow: sunlightWindow(ianaTimezone: $ianaTimezone, onDate: $tomorrowDate) {
    sunriseUtc
    sunsetUtc
  }
}`;

const twoDigits = number => `0${number}`.slice(-2);
const localDateString = date => `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}`;
const utcIsoDateString = date => date.toISOString().slice(0, -1);

export const buildFetchSunlightWindowsVariables = (today, ianaTimezone) => {
  let yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return {
    yesterdayDate: localDateString(yesterday),
    todayDate: localDateString(today),
    tomorrowDate: localDateString(tomorrow),
    ianaTimezone
  };
};

export const buildFetchListensVariables = (after, before, last) => ({
  before: utcIsoDateString(before),
  after: utcIsoDateString(after),
  last
});

const dateFromUtcString = utcString => {
  const [dateString, timeString] = utcString.split('T');
  const [fullYear, month, date] = dateString.split('-');
  const [hour, minute, second] = timeString.split(':');

  const utcDate = Date.UTC(fullYear, month - 1, date, hour, minute, second);
  return new Date(utcDate);
};

export const pluckSunlightWindow = ({ sunriseUtc, sunsetUtc }) => ({
  sunrise: dateFromUtcString(sunriseUtc),
  sunset: dateFromUtcString(sunsetUtc)
});

export const pluckSunlightWindows = ({ yesterday, today, tomorrow }) => ({
  yesterday: pluckSunlightWindow(yesterday),
  today: pluckSunlightWindow(today),
  tomorrow: pluckSunlightWindow(tomorrow)
});

export const pluckSong = ({ imageLargeUrl, imageMediumUrl, imageSmallUrl, ...graphQlSong }) => ({
  ...graphQlSong,
  images: {
    large: { url: imageLargeUrl },
    medium: { url: imageMediumUrl },
    small: { url: imageSmallUrl }
  }
});


export const pluckListen = ({ song: graphQlSong, ...graphQlListen }) => ({
  ...graphQlListen,
  listenTimeUtc: dateFromUtcString(graphQlListen.listenTimeUtc),
  song: pluckSong(graphQlSong)
});


export const pluckRelayListens = response => {
  const listens = response.allListens.edges
        .map(edge => edge.listen)
        .map(graphQlListen => pluckListen(graphQlListen));
  return {
    listens,
    hasPreviousPage: response.allListens.pageInfo.hasPreviousPage
  };
};
