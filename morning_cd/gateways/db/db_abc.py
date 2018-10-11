from abc import ABC, abstractmethod
from datetime import datetime
from typing import List, Optional

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
                      limit: int,
                      sort_time: SortOrder,
                      before_utc: Optional[datetime],
                      after_utc: Optional[datetime]) -> List[Listen]:
        ...
