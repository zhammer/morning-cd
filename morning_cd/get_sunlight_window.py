from datetime import datetime

from morning_cd import util
from morning_cd.context import Context
from morning_cd.definitions import SunlightWindow


def get_sunlight_window(context: Context, iana_timezone: str, at: datetime) -> SunlightWindow:
    """Get the sunlight window (sunrise and sunset utc datetimes) of an iana timezone
    (i.e.'Europe/Moscow') at the given `at_utc` time.
    """
    local_date = util.local_date(at, iana_timezone)
    geo_timezone = context.geo_timezone_gateway.fetch_geo_timezone(iana_timezone)
    return context.sunlight_gateway.fetch_sunlight_window(
        coordinates=geo_timezone.coordinates,
        on_day=local_date
    )
