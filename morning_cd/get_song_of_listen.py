from morning_cd.context import Context
from morning_cd.definitions import Listen, Song


def get_song_of_listen(context: Context, listen: Listen) -> Song:
    return context.music_gateway.fetch_song_of_listen(listen)
