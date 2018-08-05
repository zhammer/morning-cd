import request from 'superagent';

export async function fetchSpotifyAccessToken () {
  const response = await request.get('/accesstoken');
  return response.body.accessToken;
};
