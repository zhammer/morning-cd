from datetime import date

from morning_cd.context import Context
from morning_cd.definitions import SunlightWindow


def get_sunlight_window(context: Context, iana_timezone: str, on_day: date) -> SunlightWindow:
    """Get the approximate sunlight window (sunrise and sunset utc datetimes) of an iana timezone
    (i.e.'Europe/Moscow') on a given date.
    """
    geo_timezone = context.geo_timezone_gateway.fetch_geo_timezone(iana_timezone)
    return context.sunlight_gateway.fetch_sunlight_window(
        coordinates=geo_timezone.coordinates,
        on_day=on_day
    )
