from responses import Response


def make_post_client_credentials() -> Response:
    return Response(
        method='POST',
        url='https://accounts.spotify.com/api/token',
        json={
            'access_token': 'MockSpotifyAccessToken',
            'token_type': 'bearer',
            'expires_in': 3600
        }
    )


def make_get_track_whispers() -> Response:
    return Response(
        method='GET',
        url='https://api.spotify.com/v1/tracks/4rNGLh1y5Kkvr4bT28yfHU',
        json=WHISPERS_SPOTIFY_TRACK
    )


def make_get_track_invalid_id(invalid_song_id: str) -> Response:
    return Response(
        method='GET',
        url=f'https://api.spotify.com/v1/tracks/{invalid_song_id}',
        json={
            'error': {
                'status': 400,
                'message': 'invalid id'
            }
        },
        status=400
    )


WHISPERS_SPOTIFY_TRACK = {
  'album': {
    'album_type': 'album',
    'artists': [
      {
        'external_urls': {
          'spotify': 'https://open.spotify.com/artist/12OwAxjoznv1QOdIGR9R73'
        },
        'href': 'https://api.spotify.com/v1/artists/12OwAxjoznv1QOdIGR9R73',
        'id': '12OwAxjoznv1QOdIGR9R73',
        'name': 'DAP The Contract',
        'type': 'artist',
        'uri': 'spotify:artist:12OwAxjoznv1QOdIGR9R73'
      }
    ],
    'available_markets': [
      'AD',  # ...
      'ZA'
    ],
    'external_urls': {
      'spotify': 'https://open.spotify.com/album/0GBJBoWGJcDcxa6twSv9rG'
    },
    'href': 'https://api.spotify.com/v1/albums/0GBJBoWGJcDcxa6twSv9rG',
    'id': '0GBJBoWGJcDcxa6twSv9rG',
    'images': [
      {
        'height': 640,
        'url': 'https://i.scdn.co/image/8bc9adf1177e8d15a77b92cb637b067f34cab70f',
        'width': 640
      },
      {
        'height': 300,
        'url': 'https://i.scdn.co/image/f20066e57e5578ad3c5e5e212900da8f5dbca9a9',
        'width': 300
      },
      {
        'height': 64,
        'url': 'https://i.scdn.co/image/8643c2f4cf2b6e96ecd6ef409d9fb1a8445eac97',
        'width': 64
      }
    ],
    'name': 'Everybody Falls in the Summer',
    'release_date': '2018-11-09',
    'release_date_precision': 'day',
    'total_tracks': 12,
    'type': 'album',
    'uri': 'spotify:album:0GBJBoWGJcDcxa6twSv9rG'
  },
  'artists': [
    {
      'external_urls': {
        'spotify': 'https://open.spotify.com/artist/12OwAxjoznv1QOdIGR9R73'
      },
      'href': 'https://api.spotify.com/v1/artists/12OwAxjoznv1QOdIGR9R73',
      'id': '12OwAxjoznv1QOdIGR9R73',
      'name': 'DAP The Contract',
      'type': 'artist',
      'uri': 'spotify:artist:12OwAxjoznv1QOdIGR9R73'
    }
  ],
  'available_markets': [
    'AD',  # ...
    'ZA'
  ],
  'disc_number': 1,
  'duration_ms': 253832,
  'explicit': True,
  'external_ids': {
    'isrc': 'usl4q1805719'
  },
  'external_urls': {
    'spotify': 'https://open.spotify.com/track/4rNGLh1y5Kkvr4bT28yfHU'
  },
  'href': 'https://api.spotify.com/v1/tracks/4rNGLh1y5Kkvr4bT28yfHU',
  'id': '4rNGLh1y5Kkvr4bT28yfHU',
  'is_local': False,
  'name': 'Whispers',
  'popularity': 4,
  'preview_url': ('https://p.scdn.co/mp3-preview/8cb15d60684e08e1108a5aabde710d6568b234a1?'
                  'cid=774b29d4f13844c495f206cafdad9c86'),
  'track_number': 9,
  'type': 'track',
  'uri': 'spotify:track:4rNGLh1y5Kkvr4bT28yfHU'
}
