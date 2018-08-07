import request from 'superagent';

const BASE = 'https://yvle78zis6.execute-api.us-east-1.amazonaws.com/dev';

export async function fetchSpotifyAccessToken () {
  const response = await request.get(BASE + '/accesstoken');
  return response.body.accessToken;
};
