import { fetchSpotifyAccessToken } from './morningCd';
import { searchTracks } from './spotify';
import { withFetchAccessToken } from './util';

const api = withFetchAccessToken(fetchSpotifyAccessToken, { searchTracks });
export default api;
