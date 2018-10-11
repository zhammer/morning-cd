from morning_cd.context import Context
from morning_cd.definitions import Listen


def get_listen(context: Context, listen_id: str) -> Listen:
    return context.db_gateway.fetch_listen(listen_id)
