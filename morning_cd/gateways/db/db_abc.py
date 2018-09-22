from abc import ABC, abstractmethod

from morning_cd.definitions import Listen


class DbGatewayABC(ABC):

    @abstractmethod
    def add_listen(self, listen: Listen) -> None:
        ...
