from morning_cd.entities import day as day_entity
from morning_cd.context import Context
from morning_cd.definitions import Listen


def submit_listen(context: Context, listen: Listen) -> Listen:
    """Submit a Listen to the database."""
    if not context.music_gateway.song_exists(listen.song_id):
        raise ValueError('Song doesnt exist.')

    geo_timezone = context.geo_timezone_gateway.fetch(listen.iana_timezone)

    sunlight_info = context.sunlight_gateway.fetch(
        coordinates=geo_timezone.coordinates,
        on_day=listen.listen_time_utc.date()
    )

    if not day_entity.is_day(listen.listen_time_utc, sunlight_info):
        raise ValueError('Users can only submit listens during the day.')

    return context.db_gateway.add_listen(listen)
