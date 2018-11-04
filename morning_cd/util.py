from datetime import date, datetime
from typing import cast

import pytz

from morning_cd.definitions.exceptions import InvalidIanaTimezoneError


def local_date(datetime_utc: datetime, iana_timezone: str) -> date:
    """Return the local date of an iana_timezone at the specified datetime_utc.

    # datetime_utc is 2018-10-7 23:00:00, but it's actually 10-8 in tokyo!
    >>> local_date(datetime(2018, 10, 7, 23, 00, 0), 'Asia/Tokyo')
    datetime.date(2018, 10, 8)

    # but 'ere in new york, it's still 10-7
    >>> local_date(datetime(2018, 10, 7, 23, 00, 0), 'America/New_York')
    datetime.date(2018, 10, 7)
    """
    # there must be a better way to do this.
    try:
        timezone = pytz.timezone(iana_timezone)
    except pytz.UnknownTimeZoneError:
        raise InvalidIanaTimezoneError(f'{iana_timezone} is not a known iana timezone.')

    local_dt = datetime_utc + timezone._utcoffset  # type: ignore
    return cast(date, local_dt.date())
