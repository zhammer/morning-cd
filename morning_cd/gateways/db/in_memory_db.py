from typing import List

from morning_cd.definitions import Listen
from morning_cd.gateways.db import DbGatewayABC


class InMemoryDbGateway(DbGatewayABC):

    def __init__(self) -> None:
        self.listens: List[Listen] = []


    def add_listen(self, listen: Listen) -> None:
        self.listens.append(listen)
