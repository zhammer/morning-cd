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

    geo_timezone = context.geo_timezone_gateway.fetch_geo_timezone(listen.iana_timezone)

    sunlight_window = context.sunlight_gateway.fetch_sunlight_window(
        coordinates=geo_timezone.coordinates,
        on_day=listen.listen_time_utc.date()
    )

    if not day_entity.is_day(listen.listen_time_utc, sunlight_window):
        raise SunlightError('Listens can only be submitted during the day.')

    return context.db_gateway.add_listen(listen)
