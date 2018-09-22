from datetime import date, datetime
from typing import Dict

import requests

from morning_cd.definitions import Coordinates, SunlightInfo
from morning_cd.gateways.sunlight import SunlightGatewayABC
from morning_cd.helpers import fromisoformat


class SunriseSunsetApi(SunlightGatewayABC):
    url = 'http://api.sunrise-sunset.org/json'

    def fetch(self, coordinates: Coordinates, on_day: date) -> SunlightInfo:
        r = requests.get(self.url, params={
            'lat': str(coordinates.latitude),
            'lng': str(coordinates.longitude),
            'date': str(on_day),
            'formatted': '0'
        })

        raw_sunlight_response = r.json()

        return self._pluck_sunlight_info(raw_sunlight_response, coordinates)

    @staticmethod
    def _pluck_sunlight_info(raw_sunlight_response: Dict, coordinates: Coordinates) -> SunlightInfo:
        return SunlightInfo(
            sunrise_utc=fromisoformat(raw_sunlight_response['results']['sunrise']),
            sunset_utc=fromisoformat(raw_sunlight_response['results']['sunset']),
            coordinates=coordinates
        )
