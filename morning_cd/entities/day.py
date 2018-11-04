from datetime import datetime

from morning_cd.definitions import SunlightWindow


def is_day(datetime_utc: datetime, sunlight_window: SunlightWindow) -> bool:
    return datetime_utc > sunlight_window.sunrise_utc and datetime_utc < sunlight_window.sunset_utc
