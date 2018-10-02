from datetime import date, datetime
from typing import Dict

import requests

from morning_cd.definitions import Coordinates, SunlightWindow
from morning_cd.gateways.sunlight import SunlightGatewayABC


class SunriseSunsetApiGateway(SunlightGatewayABC):
    url = 'http://api.sunrise-sunset.org/json'
    dt_fmt = '%Y-%m-%dT%H:%M:%S'

    def fetch_sunlight_window(self, coordinates: Coordinates, on_day: date) -> SunlightWindow:
        r = requests.get(self.url, params={
            'lat': str(coordinates.latitude),
            'lng': str(coordinates.longitude),
            'date': str(on_day),
            'formatted': '0'
        })

        raw_sunlight_response = r.json()

        return self._pluck_sunlight_info(raw_sunlight_response, coordinates)

    @staticmethod
    def _pluck_sunlight_info(raw_sunlight_response: Dict, coordinates: Coordinates) -> SunlightWindow:
        return SunlightWindow(
            sunrise_utc=SunriseSunsetApiGateway._pluck_datetime(raw_sunlight_response['results']['sunrise']),
            sunset_utc=SunriseSunsetApiGateway._pluck_datetime(raw_sunlight_response['results']['sunset']),
            coordinates=coordinates
        )

    @staticmethod
    def _pluck_datetime(dt_str: str) -> datetime:
        """Assumes utc response where offset is always 00:00.

        >>> SunriseSunsetApiGateway._pluck_datetime('2018-10-02T22:36:09+00:00')
        datetime.datetime(2018, 10, 2, 22, 36, 9)
        """
        without_tz = dt_str.split('+')[0]
        return datetime.strptime(without_tz, SunriseSunsetApiGateway.dt_fmt)
