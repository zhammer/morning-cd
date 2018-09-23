from abc import ABC, abstractmethod

from morning_cd.definitions import Song


class MusicGatewayABC(ABC):

    @abstractmethod
    def fetch_song(self, song_id: str) -> Song:
        ...


    @abstractmethod
    def song_exists(self, song_id: str) -> bool:
        ...
