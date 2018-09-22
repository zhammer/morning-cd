from datetime import datetime

from morning_cd.definitions import SunlightInfo


def is_day(datetime_utc: datetime, sunlight_info: SunlightInfo) -> bool:
    return datetime_utc > sunlight_info.sunrise_utc and datetime_utc < sunlight_info.sunset_utc
