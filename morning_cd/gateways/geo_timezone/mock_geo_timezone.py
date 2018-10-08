from typing import Dict

from morning_cd.definitions import Coordinates, GeoTimezone
from morning_cd.definitions.exceptions import InvalidIanaTimezoneError
from morning_cd.gateways.geo_timezone import GeoTimezoneGatewayABC


class MockGeoTimezoneGateway(GeoTimezoneGatewayABC):

    def fetch_geo_timezone(self, iana_name: str) -> GeoTimezone:
        try:
            return _geo_timezone_by_iana_name[iana_name]
        except LookupError:
            raise InvalidIanaTimezoneError(f'{iana_name} is not a known iana timezone.')


_geo_timezone_by_iana_name: Dict[str, GeoTimezone] = {
    'America/New_York': GeoTimezone(
        iana_name='American/New_York',
        coordinates=Coordinates(
            latitude=40.4251,
            longitude=-74.0023
        )
    ),
    'Asia/Tokyo': GeoTimezone(
        iana_name='Asia/Tokyo',
        coordinates=Coordinates(
            latitude=35.3916,
            longitude=139.4441
        )
    ),
    'Europe/Moscow': GeoTimezone(
        iana_name='Europe/Moscow',
        coordinates=Coordinates(
            latitude=55.4521,
            longitude=37.3704
        )
    )
}
