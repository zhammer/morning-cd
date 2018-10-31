from datetime import datetime
from typing import List, Optional

from morning_cd import use_sunlight_windows, util
from morning_cd.context import Context
from morning_cd.definitions import Listen, Song, SortOrder
from morning_cd.definitions.exceptions import (
    InvalidSongError,
    SunlightError
)
from morning_cd.entities import day as day_entity


def get_listen(context: Context, listen_id: str) -> Listen:
    return context.db_gateway.fetch_listen(listen_id)


def get_listens(context: Context,
                limit: int,
                sort_time: SortOrder,
                before_utc: Optional[datetime] = None,
                after_utc: Optional[datetime] = None) -> List[Listen]:
    return context.db_gateway.fetch_listens(
        before_utc=before_utc,
        after_utc=after_utc,
        sort_time=sort_time,
        limit=limit
    )


def get_song_of_listen(context: Context, listen: Listen) -> Song:
    return context.music_gateway.fetch_song_of_listen(listen)


def submit_listen(context: Context, listen: Listen) -> Listen:
    """Submit a Listen to the database."""
    if not context.music_gateway.song_exists(listen.song_id):
        raise InvalidSongError(f'Song {listen.song_id} doesnt exist.')

    local_date = util.local_date(listen.listen_time_utc, listen.iana_timezone)
    sunlight_window = use_sunlight_windows.get_sunlight_window(
        context,
        listen.iana_timezone,
        on_day=local_date
    )

    if not day_entity.is_day(listen.listen_time_utc, sunlight_window):
        raise SunlightError('Listens can only be submitted during the day.')

    return context.db_gateway.add_listen(listen)
