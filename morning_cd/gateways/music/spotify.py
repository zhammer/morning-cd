from typing import cast, Dict, Optional

import requests

from morning_cd.definitions import Listen, Song, Vendor
from morning_cd.definitions.exceptions import InvalidSongError
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

    def fetch_song_of_listen(self, listen: Listen) -> Song:
        return self.fetch_song(listen.song_id)

    def fetch_song(self, song_id: str) -> Song:
        r = requests.get(
            self.base_url + '/tracks/' + song_id,
            headers={'Authorization': 'Bearer ' + self.bearer_token}
        )

        if r.status_code == requests.codes.ok:
            return SpotifyGateway._pluck_song(r.json())

        else:
            if r.status_code == requests.codes.unauthorized:
                raise PermissionError('Spotify authentication failed.')

            elif (r.status_code == requests.codes.bad_request
                  or r.status_code == requests.codes.not_found):
                raise InvalidSongError(r.json()['error']['message'])

            else:
                raise RuntimeError('Unexpected error code from spotify. "{}"'.format(r.json()))

    def song_exists(self, song_id: str) -> bool:
        try:
            self.fetch_song(song_id)
        except InvalidSongError:
            return False
        else:
            return True

    @staticmethod
    def fetch_bearer_token(client_id: str, client_secret: str) -> str:
        r = requests.post(
            SpotifyGateway.auth_url,
            auth=(client_id, client_secret),
            data={'grant_type': 'client_credentials'}
        )

        return cast(str, r.json()['access_token'])

    @staticmethod
    def _pluck_song(raw_song: Dict) -> Song:
        return Song(
            id=raw_song['id'],
            name=raw_song['name'],
            artist_name=raw_song['artists'][0]['name'],
            album_name=raw_song['album']['name'],
            image_url_by_size={
                'large': raw_song['album']['images'][0]['url'],
                'medium': raw_song['album']['images'][1]['url'],
                'small': raw_song['album']['images'][2]['url']
            },
            vendor=Vendor.SPOTIFY
        )
