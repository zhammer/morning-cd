import {
  fetchSpotifyAccessToken,
  fetchSunlightWindows,
  fetchListens,
  submitListen
} from './morningCd';
import { searchSongs } from './spotify';
import { withFetchAccessToken } from './util';
import { Song } from '../../types';

interface SpotifyApi { // still need to figure out withFetchAccessToken decorator typing
  searchSongs: (query: string) => Promise<Song[]>;
}

const spotifyApi = withFetchAccessToken(fetchSpotifyAccessToken, { searchSongs }) as SpotifyApi;

const morningCdApi = {
  fetchListens,
  submitListen,
  fetchSunlightWindows
};

const api = {
  ...spotifyApi,
  ...morningCdApi
};

export default api;
