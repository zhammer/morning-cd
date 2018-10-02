from abc import ABC, abstractmethod

from morning_cd.definitions import Listen, Song


class MusicGatewayABC(ABC):

    @abstractmethod
    def fetch_song_of_listen(self, listen: Listen) -> Song:
        ...


    @abstractmethod
    def song_exists(self, song_id: str) -> bool:
        ...
