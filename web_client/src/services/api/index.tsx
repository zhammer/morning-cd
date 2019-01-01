import {
  fetchSpotifyAccessToken,
  fetchSunlightWindows,
  fetchListens,
  submitListen
} from './morningCd';
import { searchTracks } from './spotify';
import { withFetchAccessToken } from './util';
import { Song } from '../../types';

interface SpotifyApi { // still need to figure out withFetchAccessToken decorator typing
  searchTracks: (query: string) => Promise<Song[]>;
}

const spotifyApi = withFetchAccessToken(fetchSpotifyAccessToken, { searchTracks }) as SpotifyApi;

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
