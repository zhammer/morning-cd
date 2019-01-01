import request from 'superagent';
import { AccessTokenExpiredError } from './definitions';
import { makeBearer } from './util';
import { Song } from '../../types';

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

/**
 *  Decorator for spotify api functions that throws AccessTokenExpiredErrors if the access token
 *  has expired.
 */
export const throwAccessTokenExpired = (apiFunction: (...args: any[]) => Promise<any>) => async (...args: any[]) => {
  try {
    return await apiFunction(...args);
  }
  catch (e) {
    if (e.status === 401 && JSON.parse(e.response.text).error.message === 'The access token expired') {
      throw new AccessTokenExpiredError('The access token expired');
    }
    else {
      throw(e);
    }
  }
};

export const searchSongs = (accessToken: string) => throwAccessTokenExpired(async (query, market = 'US', limit = '5'): Promise<Song[]> => {
  const response = await request.get(SPOTIFY_BASE_URL + '/search')
        .query({ q: query })
        .query({ market })
        .query({ limit })
        .query({ type: 'track' })
        .set('Authorization', makeBearer(accessToken));
  return pluckSearchTracks(response.body);
});

export const pluckSongs = (rawSongs: any[]): Song[] => rawSongs.map(
  ({ id, name, artists, album }) => ({
    id,
    name,
    artist: artists[0].name,
    album: album.name,
    images: {
      large: { url: album.images[0].url },
      medium: { url: album.images[1].url },
      small: { url: album.images[2].url }
    }
  })
);


export const pluckSearchTracks = ({ tracks: { items: rawSongs } }: { tracks: any }): Song[] => pluckSongs(rawSongs);
