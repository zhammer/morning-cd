from datetime import datetime
from typing import NamedTuple


class Listen(NamedTuple):
    song_id: str
    song_vendor: str
    listener_name: str
    listen_time_utc: datetime
    note: str
    iana_timezone: str
