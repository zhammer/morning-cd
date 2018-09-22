from datetime import datetime
from typing import NamedTuple

from morning_cd.definitions import Coordinates


class SunlightInfo(NamedTuple):
    sunrise_utc: datetime
    sunset_utc: datetime
    coordinates: Coordinates
