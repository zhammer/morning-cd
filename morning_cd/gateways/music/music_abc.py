from abc import ABC, abstractmethod


class MusicGatewayABC(ABC):

    @abstractmethod
    def song_exists(self, song_id: str) -> bool:
        ...
