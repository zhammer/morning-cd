from morning_cd import get_sunlight_window, util
from morning_cd.context import Context
from morning_cd.definitions import Listen
from morning_cd.definitions.exceptions import (
    InvalidSongError,
    SunlightError
)
from morning_cd.entities import day as day_entity


def submit_listen(context: Context, listen: Listen) -> Listen:
    """Submit a Listen to the database."""
    if not context.music_gateway.song_exists(listen.song_id):
        raise InvalidSongError(f'Song {listen.song_id} doesnt exist.')

    local_date = util.local_date(listen.listen_time_utc, listen.iana_timezone)
    sunlight_window = get_sunlight_window(context, listen.iana_timezone, on_day=local_date)

    if not day_entity.is_day(listen.listen_time_utc, sunlight_window):
        raise SunlightError('Listens can only be submitted during the day.')

    return context.db_gateway.add_listen(listen)
