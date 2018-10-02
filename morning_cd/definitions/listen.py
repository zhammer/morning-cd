from datetime import datetime
from typing import NamedTuple, Optional

from morning_cd.definitions import Vendor


class Listen(NamedTuple):
    song_id: str
    song_vendor: Vendor
    listener_name: str
    listen_time_utc: datetime
    note: str
    iana_timezone: str

    id: Optional[str] = None
