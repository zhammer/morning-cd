from responses import Response


def make_get_sunrise_sunset() -> Response:
    lat = 40.714166666666664
    lng = -74.00638888888889
    date = '2018-11-12'

    return Response(
        method='GET',
        url=f'http://api.sunrise-sunset.org/json?lat={lat}&lng={lng}&date={date}&formatted=0',
        json=SUNRISE_SUNSET_RESPONSE
    )


SUNRISE_SUNSET_RESPONSE = {
  'results': {
    'sunrise': '2018-11-12T11:40:04+00:00',
    'sunset': '2018-11-12T21:40:26+00:00',
    'solar_noon': '2018-11-12T16:40:15+00:00',
    'day_length': 36022,
    'civil_twilight_begin': '2018-11-12T11:10:59+00:00',
    'civil_twilight_end': '2018-11-12T22:09:31+00:00',
    'nautical_twilight_begin': '2018-11-12T10:38:02+00:00',
    'nautical_twilight_end': '2018-11-12T22:42:28+00:00',
    'astronomical_twilight_begin': '2018-11-12T10:05:46+00:00',
    'astronomical_twilight_end': '2018-11-12T23:14:44+00:00'
  },
  'status': 'OK'
}
