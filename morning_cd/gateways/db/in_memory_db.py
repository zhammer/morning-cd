from datetime import datetime
from typing import List, Optional

from morning_cd.definitions import Listen, SortOrder
from morning_cd.gateways.db import DbGatewayABC


class InMemoryDbGateway(DbGatewayABC):

    def __init__(self, listens: Optional[List[Listen]] = None) -> None:
        self.listens: List[Listen] = listens or []

    def add_listen(self, listen: Listen) -> None:
        self.listens.append(listen)

    def fetch_listens(self,
                      before_utc: datetime,
                      after_utc: datetime,
                      sort_time: SortOrder,
                      limit: int) -> List[Listen]:

        listens_in_range = [listen for listen in self.listens
                            if listen.listen_time_utc < before_utc
                            and listen.listen_time_utc > after_utc]

        sorted_listens_in_range = sorted(
            listens_in_range,
            key=lambda listen: listen.listen_time_utc,
            reverse=(sort_time == SortOrder.DESCENDING)
        )

        return sorted_listens_in_range[:limit]
