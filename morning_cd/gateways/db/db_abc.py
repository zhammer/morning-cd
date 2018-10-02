from abc import ABC, abstractmethod
from datetime import datetime
from typing import List

from morning_cd.definitions import Listen, SortOrder


class DbGatewayABC(ABC):

    @abstractmethod
    def add_listen(self, listen: Listen) -> Listen:
        ...

    @abstractmethod
    def fetch_listen(self, listen_id: str) -> Listen:
        ...

    @abstractmethod
    def fetch_listens(self,
                      before_utc: datetime,
                      after_utc: datetime,
                      sort_time: SortOrder,
                      limit: int) -> List[Listen]:
        ...
