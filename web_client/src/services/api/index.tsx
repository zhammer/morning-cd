import {
  fetchSpotifyAccessToken,
  fetchSunlightWindows,
  fetchListens,
  submitListen
} from './morningCd';
import { searchTracks } from './spotify';
import { withFetchAccessToken } from './util';


const spotifyApi = withFetchAccessToken(fetchSpotifyAccessToken, { searchTracks });

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
