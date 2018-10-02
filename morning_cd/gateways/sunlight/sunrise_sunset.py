from datetime import date, datetime
from typing import Dict

import requests

from morning_cd.definitions import Coordinates, SunlightWindow
from morning_cd.gateways.sunlight import SunlightGatewayABC
from morning_cd.helpers import fromisoformat


class SunriseSunsetApiGateway(SunlightGatewayABC):
    url = 'http://api.sunrise-sunset.org/json'

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
            sunrise_utc=fromisoformat(raw_sunlight_response['results']['sunrise']),
            sunset_utc=fromisoformat(raw_sunlight_response['results']['sunset']),
            coordinates=coordinates
        )
