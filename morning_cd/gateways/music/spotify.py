from typing import Optional

import requests

from morning_cd.gateways.music import MusicGatewayABC


class SpotifyGateway(MusicGatewayABC):
    base_url = 'https://api.spotify.com/v1'
    auth_url = 'https://accounts.spotify.com/api/token'

    def __init__(self, *, bearer_token: Optional[str] = None,
                 client_id: Optional[str] = None, client_secret: Optional[str] = None) -> None:
        """C'tor for the SpotifyGateway. Requires either a valid `bearer_token` or a `client_id`,
        `client_secret` pairing for authentication.
        """
        if bearer_token:
            self.bearer_token = bearer_token

        elif client_id and client_secret:
            self.bearer_token = SpotifyGateway.fetch_bearer_token(client_id, client_secret)

        else:
            raise ValueError('SpotifyGateway requires either a `bearer_token` or (`client_id`, '
                             '`client_secret`) for auth.')

    def song_exists(self, song_id: str) -> bool:
        r = requests.get(
            self.base_url + '/tracks/' + song_id,
            headers={'Authorization': 'Bearer ' + self.bearer_token}
        )

        if r.status_code == requests.codes.unauthorized:
            raise PermissionError('Spotify authentication failed.')

        return r.status_code == requests.codes.ok

    @staticmethod
    def fetch_bearer_token(client_id: str, client_secret: str) -> str:
        r = requests.post(
            SpotifyGateway.auth_url,
            auth=(client_id, client_secret),
            data={'grant_type': 'client_credentials'}
        )

        return r.json()['access_token']
