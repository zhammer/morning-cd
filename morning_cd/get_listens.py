from datetime import datetime
from typing import List, Optional

from morning_cd.context import Context
from morning_cd.definitions import Listen, SortOrder


def get_listens(context: Context,
                before_utc: datetime,
                after_utc: datetime,
                sort_time: SortOrder,
                limit: int) -> List[Listen]:
    return context.db_gateway.fetch_listens(
        before_utc=before_utc,
        after_utc=after_utc,
        sort_time=sort_time,
        limit=limit
    )
