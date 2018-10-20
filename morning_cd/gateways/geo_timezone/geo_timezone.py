import iana_tz_coord

from morning_cd.definitions import Coordinates, GeoTimezone
from morning_cd.definitions.exceptions import InvalidIanaTimezoneError
from morning_cd.gateways.geo_timezone import GeoTimezoneGatewayABC


class GeoTimezoneGateway(GeoTimezoneGatewayABC):

    def fetch_geo_timezone(self, iana_name: str) -> GeoTimezone:
        try:
            coordinates: iana_tz_coord.Coordinates = iana_tz_coord.get_coordinates(iana_name)
        except LookupError:
            raise InvalidIanaTimezoneError(f'{iana_name} is not a known iana timezone.')

        return GeoTimezone(
            iana_name=iana_name,
            coordinates=Coordinates(**coordinates._asdict())
        )
