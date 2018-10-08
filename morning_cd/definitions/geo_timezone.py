from typing import NamedTuple

from morning_cd.definitions import Coordinates


class GeoTimezone(NamedTuple):
    iana_name: str
    coordinates: Coordinates
