from datetime import timedelta
from typing import NamedTuple

from morning_cd.definitions import Coordinates


class GeoTimezone(NamedTuple):
    iana_name: str
    utc_offset: timedelta
    coordinates: Coordinates
