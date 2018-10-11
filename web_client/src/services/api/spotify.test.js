import { pluckSearchTracks } from './spotify';

describe('helpers', () => {
  describe('pluckSearchTracks', () => {
    it('plucks tracks from search response', () => {
      const pluckedTracks = pluckSearchTracks(RAW_SEARCH_RESPONSE);
      const expectedTracks = [
        {
          id: '5jgFfDIR6FR0gvlA56Nakr',
          name: 'Blackbird - Remastered',
          artist: 'The Beatles',
          album: 'The Beatles (Remastered)',
          images: {
            small: {
              url: 'https://i.scdn.co/image/395d7bdb8713327f6ddce44740caee2b4739ff5f'
            },
            medium: {
              url: 'https://i.scdn.co/image/b6fe2afbd9fc1719d08765e693c9d91e5cafb38e'
            },
            large: {
              url: 'https://i.scdn.co/image/2782d94528b449fb6910300cc8c8f93ab8cc7a8d'
            }
          }
        },
        {
          id: '3vakfghtamvATOiEO9AnT1',
          name: 'Blackbird',
          artist: 'Alkaline Trio',
          album: 'Blackbird',
          images: {
            small: {
              url: 'https://i.scdn.co/image/2d94e7543653ac4df798359b39d2b18e48df6ebc'
            },
            medium: {
              url: 'https://i.scdn.co/image/78b8433ab59af9ebf141cb3fc3369650214f1cd2'
            },
            large: {
              url: 'https://i.scdn.co/image/9a4757930460c01ebb7e78961237a408e5f449ef'
            }
          }
        },
        {
          id: '6pRPoKyrZ2VNlgpvU6wwNB',
          name: 'Blackbird',
          artist: 'Alter Bridge',
          album: 'Blackbird',
          images: {
            small: {
              url: 'https://i.scdn.co/image/a50a55edcb7b6547b862a435a53db83a1663f638'
            },
            medium: {
              url: 'https://i.scdn.co/image/543bede45e84841f77ff49c914344991d116a72e'
            },
            large: {
              url: 'https://i.scdn.co/image/0d7e1d7b5e1cc70c6cd234add6f586f70bbc3d03'
            }
          }
        }
      ];
      expect(pluckedTracks).toEqual(expectedTracks);
    });
  });
});

export const RAW_SEARCH_RESPONSE = {
  'tracks': {
    'href': 'https://api.spotify.com/v1/search?query=blackbird&type=track&market=US&offset=0&limit=5',
    'items': [
      {
        'album': {
          'album_type': 'album',
          'artists': [
            {
              'external_urls': {
                'spotify': 'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2'
              },
              'href': 'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2',
              'id': '3WrFJ7ztbogyGnTHbHJFl2',
              'name': 'The Beatles',
              'type': 'artist',
              'uri': 'spotify:artist:3WrFJ7ztbogyGnTHbHJFl2'
            }
          ],
          'external_urls': {
            'spotify': 'https://open.spotify.com/album/1klALx0u4AavZNEvC4LrTL'
          },
          'href': 'https://api.spotify.com/v1/albums/1klALx0u4AavZNEvC4LrTL',
          'id': '1klALx0u4AavZNEvC4LrTL',
          'images': [
            {
              'height': 640,
              'url': 'https://i.scdn.co/image/2782d94528b449fb6910300cc8c8f93ab8cc7a8d',
              'width': 640
            },
            {
              'height': 300,
              'url': 'https://i.scdn.co/image/b6fe2afbd9fc1719d08765e693c9d91e5cafb38e',
              'width': 300
            },
            {
              'height': 64,
              'url': 'https://i.scdn.co/image/395d7bdb8713327f6ddce44740caee2b4739ff5f',
              'width': 64
            }
          ],
          'name': 'The Beatles (Remastered)',
          'release_date': '1968-11-22',
          'release_date_precision': 'day',
          'type': 'album',
          'uri': 'spotify:album:1klALx0u4AavZNEvC4LrTL'
        },
        'artists': [
          {
            'external_urls': {
              'spotify': 'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2'
            },
            'href': 'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2',
            'id': '3WrFJ7ztbogyGnTHbHJFl2',
            'name': 'The Beatles',
            'type': 'artist',
            'uri': 'spotify:artist:3WrFJ7ztbogyGnTHbHJFl2'
          }
        ],
        'disc_number': 1,
        'duration_ms': 138386,
        'explicit': false,
        'external_ids': {
          'isrc': 'GBAYE0601654'
        },
        'external_urls': {
          'spotify': 'https://open.spotify.com/track/5jgFfDIR6FR0gvlA56Nakr'
        },
        'href': 'https://api.spotify.com/v1/tracks/5jgFfDIR6FR0gvlA56Nakr',
        'id': '5jgFfDIR6FR0gvlA56Nakr',
        'is_local': false,
        'is_playable': true,
        'name': 'Blackbird - Remastered',
        'popularity': 72,
        'preview_url': null,
        'track_number': 11,
        'type': 'track',
        'uri': 'spotify:track:5jgFfDIR6FR0gvlA56Nakr'
      },
      {
        'album': {
          'album_type': 'single',
          'artists': [
            {
              'external_urls': {
                'spotify': 'https://open.spotify.com/artist/1aEYCT7t18aM3VvM6y8oVR'
              },
              'href': 'https://api.spotify.com/v1/artists/1aEYCT7t18aM3VvM6y8oVR',
              'id': '1aEYCT7t18aM3VvM6y8oVR',
              'name': 'Alkaline Trio',
              'type': 'artist',
              'uri': 'spotify:artist:1aEYCT7t18aM3VvM6y8oVR'
            }
          ],
          'external_urls': {
            'spotify': 'https://open.spotify.com/album/4xve0DPfVlsGqtL0OAv7Pu'
          },
          'href': 'https://api.spotify.com/v1/albums/4xve0DPfVlsGqtL0OAv7Pu',
          'id': '4xve0DPfVlsGqtL0OAv7Pu',
          'images': [
            {
              'height': 640,
              'url': 'https://i.scdn.co/image/9a4757930460c01ebb7e78961237a408e5f449ef',
              'width': 640
            },
            {
              'height': 300,
              'url': 'https://i.scdn.co/image/78b8433ab59af9ebf141cb3fc3369650214f1cd2',
              'width': 300
            },
            {
              'height': 64,
              'url': 'https://i.scdn.co/image/2d94e7543653ac4df798359b39d2b18e48df6ebc',
              'width': 64
            }
          ],
          'name': 'Blackbird',
          'release_date': '2018-07-19',
          'release_date_precision': 'day',
          'type': 'album',
          'uri': 'spotify:album:4xve0DPfVlsGqtL0OAv7Pu'
        },
        'artists': [
          {
            'external_urls': {
              'spotify': 'https://open.spotify.com/artist/1aEYCT7t18aM3VvM6y8oVR'
            },
            'href': 'https://api.spotify.com/v1/artists/1aEYCT7t18aM3VvM6y8oVR',
            'id': '1aEYCT7t18aM3VvM6y8oVR',
            'name': 'Alkaline Trio',
            'type': 'artist',
            'uri': 'spotify:artist:1aEYCT7t18aM3VvM6y8oVR'
          }
        ],
        'disc_number': 1,
        'duration_ms': 200240,
        'explicit': false,
        'external_ids': {
          'isrc': 'USEP41836002'
        },
        'external_urls': {
          'spotify': 'https://open.spotify.com/track/3vakfghtamvATOiEO9AnT1'
        },
        'href': 'https://api.spotify.com/v1/tracks/3vakfghtamvATOiEO9AnT1',
        'id': '3vakfghtamvATOiEO9AnT1',
        'is_local': false,
        'is_playable': true,
        'name': 'Blackbird',
        'popularity': 57,
        'preview_url': 'https://p.scdn.co/mp3-preview/cabda0b17bdfe434bd54e007ef4c6d4fe5978893?cid=774b29d4f13844c495f206cafdad9c86',
        'track_number': 1,
        'type': 'track',
        'uri': 'spotify:track:3vakfghtamvATOiEO9AnT1'
      },
      {
        'album': {
          'album_type': 'album',
          'artists': [
            {
              'external_urls': {
                'spotify': 'https://open.spotify.com/artist/4DWX7u8BV0vZIQSpJQQDWU'
              },
              'href': 'https://api.spotify.com/v1/artists/4DWX7u8BV0vZIQSpJQQDWU',
              'id': '4DWX7u8BV0vZIQSpJQQDWU',
              'name': 'Alter Bridge',
              'type': 'artist',
              'uri': 'spotify:artist:4DWX7u8BV0vZIQSpJQQDWU'
            }
          ],
          'external_urls': {
            'spotify': 'https://open.spotify.com/album/21lOBQT94kjWSiYQbpm3RG'
          },
          'href': 'https://api.spotify.com/v1/albums/21lOBQT94kjWSiYQbpm3RG',
          'id': '21lOBQT94kjWSiYQbpm3RG',
          'images': [
            {
              'height': 640,
              'url': 'https://i.scdn.co/image/0d7e1d7b5e1cc70c6cd234add6f586f70bbc3d03',
              'width': 631
            },
            {
              'height': 300,
              'url': 'https://i.scdn.co/image/543bede45e84841f77ff49c914344991d116a72e',
              'width': 296
            },
            {
              'height': 64,
              'url': 'https://i.scdn.co/image/a50a55edcb7b6547b862a435a53db83a1663f638',
              'width': 63
            }
          ],
          'name': 'Blackbird',
          'release_date': '2007-01-01',
          'release_date_precision': 'day',
          'type': 'album',
          'uri': 'spotify:album:21lOBQT94kjWSiYQbpm3RG'
        },
        'artists': [
          {
            'external_urls': {
              'spotify': 'https://open.spotify.com/artist/4DWX7u8BV0vZIQSpJQQDWU'
            },
            'href': 'https://api.spotify.com/v1/artists/4DWX7u8BV0vZIQSpJQQDWU',
            'id': '4DWX7u8BV0vZIQSpJQQDWU',
            'name': 'Alter Bridge',
            'type': 'artist',
            'uri': 'spotify:artist:4DWX7u8BV0vZIQSpJQQDWU'
          }
        ],
        'disc_number': 1,
        'duration_ms': 478133,
        'explicit': false,
        'external_ids': {
          'isrc': 'USUM70749613'
        },
        'external_urls': {
          'spotify': 'https://open.spotify.com/track/6pRPoKyrZ2VNlgpvU6wwNB'
        },
        'href': 'https://api.spotify.com/v1/tracks/6pRPoKyrZ2VNlgpvU6wwNB',
        'id': '6pRPoKyrZ2VNlgpvU6wwNB',
        'is_local': false,
        'is_playable': true,
        'name': 'Blackbird',
        'popularity': 49,
        'preview_url': null,
        'track_number': 8,
        'type': 'track',
        'uri': 'spotify:track:6pRPoKyrZ2VNlgpvU6wwNB'
      }
    ],
    'limit': 5,
    'next': 'https://api.spotify.com/v1/search?query=blackbird&type=track&market=US&offset=5&limit=5',
    'offset': 0,
    'previous': null,
    'total': 6841
  }
};
