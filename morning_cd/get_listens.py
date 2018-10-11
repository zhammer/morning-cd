from datetime import datetime
from typing import List, Optional

from morning_cd.context import Context
from morning_cd.definitions import Listen, SortOrder


def get_listens(context: Context,
                limit: int,
                sort_time: SortOrder,
                before_utc: Optional[datetime] = None,
                after_utc: Optional[datetime] = None) -> List[Listen]:
    return context.db_gateway.fetch_listens(
        before_utc=before_utc,
        after_utc=after_utc,
        sort_time=sort_time,
        limit=limit
    )
