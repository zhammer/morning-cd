from morning_cd.context import Context
from morning_cd.definitions import Song


def get_song(context: Context, song_id: str) -> Song:
    return context.music_gateway.fetch_song(song_id)
