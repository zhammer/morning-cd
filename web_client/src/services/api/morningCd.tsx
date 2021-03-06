import { request as graphQlRequest } from 'graphql-request';
import request from 'superagent';
import { Listen, SunlightWindows, Song } from '../../types';

const BASE = process.env.REACT_APP_API_ENDPOINT;
const GRAPHQL_BASE = BASE + '/graphql';

interface RawSunlightWindow {
  sunriseUtc: string;
  sunsetUtc: string;
}

interface RawSunlightWindows {
  yesterday: RawSunlightWindow;
  today: RawSunlightWindow;
  tomorrow: RawSunlightWindow;
}

interface RawSong {
  id: string;
  name: string;
  album: string;
  artist: string;
  imageLargeUrl: string;
  imageMediumUrl: string;
  imageSmallUrl: string;
}

interface RawListen {
  ianaTimezone: string;
  id: string;
  listenTimeUtc: string;
  listenerName: string;
  note?: string;
  song: RawSong;
}

interface RawListensResponse {
  allListens: {
    edges: { listen: RawListen }[];
    pageInfo: {
      hasPreviousPage: boolean;
    }
  }
}

interface PaginationArgs {
  after?: Date;
  before?: Date;
  first?: number;
  last?: number;
}

export async function fetchSpotifyAccessToken(): Promise<string> {
  const response = await request.get(BASE + '/accesstoken');
  return response.body.accessToken;
};


export async function fetchListens(paginationArgs: PaginationArgs): Promise<{ listens: Listen[], hasPreviousPage: boolean }> {
  const variables = buildFetchListensVariables(paginationArgs);
  const response = await graphQlRequest(GRAPHQL_BASE, ALL_LISTENS_QUERY, variables) as RawListensResponse;
  return pluckRelayListens(response);
};


export async function fetchSunlightWindows(today: Date, ianaTimezone: string): Promise<SunlightWindows> {
  const variables = buildFetchSunlightWindowsVariables(today, ianaTimezone);
  const response = await graphQlRequest(GRAPHQL_BASE, SUNLIGHT_WINDOWS_QUERY, variables) as RawSunlightWindows;
  return pluckSunlightWindows(response);
};


export async function submitListen(songId: string, listenerName: string, note: string, ianaTimezone: string): Promise<Listen> {
  const variables = {
    listenInput: {
      songId,
      listenerName,
      note,
      ianaTimezone
    }
  };
  const response = await graphQlRequest(GRAPHQL_BASE, SUBMIT_LISTEN_MUTATION, variables) as { submitListen: RawListen };
  return pluckListen(response.submitListen);
};


export const ALL_LISTENS_QUERY = `
query allListens($after: DateTime, $before: DateTime, $last: Int, $first: Int) {
  allListens(after: $after, before: $before, last: $last, first: $first) {
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
mutation submit($listenInput: ListenInput!) {
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

function twoDigits(number: number): string {
  return `0${number}`.slice(-2);
}

function localDateString(date: Date): string {
  return `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}`;;
}

function utcIsoDateString(date: Date): string {
  return date.toISOString().slice(0, -1);
}

function buildFetchSunlightWindowsVariables(today: Date, ianaTimezone: string) {
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

function buildFetchListensVariables({ before, after, first, last }: PaginationArgs) {
  return {
    before: before && utcIsoDateString(before),
    after: after && utcIsoDateString(millisecondAfter(after)),
    last,
    first
  }
}

export function dateFromUtcString(utcString: string): Date {
  const [dateString, timeString] = utcString.split('T');
  const [fullYear, month, date] = dateString.split('-');
  const [hour, minute, secondString] = timeString.split(':');
  const [second, microsecond] = secondString.split('.');

  const utcDate = Date.UTC(
    parseInt(fullYear),
    parseInt(month) - 1,
    parseInt(date),
    parseInt(hour),
    parseInt(minute),
    parseInt(second),
    microsecond ? (parseInt(microsecond) / 1000) : 0
  );
  return new Date(utcDate);
};

function pluckSunlightWindow({ sunriseUtc, sunsetUtc }: RawSunlightWindow) {
  return {
    sunrise: dateFromUtcString(sunriseUtc),
    sunset: dateFromUtcString(sunsetUtc)
  }
}

function pluckSunlightWindows({ yesterday, today, tomorrow }: RawSunlightWindows) {
  return {
    yesterday: pluckSunlightWindow(yesterday),
    today: pluckSunlightWindow(today),
    tomorrow: pluckSunlightWindow(tomorrow)
  }
}

function pluckSong({ imageLargeUrl, imageMediumUrl, imageSmallUrl, ...graphQlSong }: RawSong): Song {
  return {
    ...graphQlSong,
    images: {
      large: { url: imageLargeUrl },
      medium: { url: imageMediumUrl },
      small: { url: imageSmallUrl }
    }
  }
}


function pluckListen({ song: graphQlSong, ...graphQlListen }: RawListen): Listen {
  return {
    ...graphQlListen,
    listenTime: dateFromUtcString(graphQlListen.listenTimeUtc),
    song: pluckSong(graphQlSong)
  }
}


function pluckRelayListens(response: RawListensResponse): { listens: Listen[], hasPreviousPage: boolean } {
  const listens = response.allListens.edges
    .map(edge => edge.listen)
    .map(graphQlListen => pluckListen(graphQlListen));
  return {
    listens,
    hasPreviousPage: response.allListens.pageInfo.hasPreviousPage
  };
};

function millisecondAfter(date: Date) {
  return new Date(date.getTime() + 1);
}