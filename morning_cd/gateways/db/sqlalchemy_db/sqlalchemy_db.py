from datetime import datetime
from typing import Callable, cast, Iterable, List

from sqlalchemy import asc, create_engine, desc
from sqlalchemy.orm import Query, sessionmaker

from morning_cd.definitions import Listen, SortOrder
from morning_cd.gateways.db import DbGatewayABC
from morning_cd.gateways.db.sqlalchemy_db.models import Base, SqlListen


class SqlAlchemyDbGateway(DbGatewayABC):

    def __init__(self, db_name: str, echo: bool = False) -> None:
        self.engine = create_engine(db_name, echo=echo)
        Session = sessionmaker(bind=self.engine)
        self.session = Session()

    def add_listen(self, listen: Listen) -> Listen:
        sql_listen = SqlAlchemyDbGateway._build_sql_listen(listen)
        self.session.add(sql_listen)
        self.session.commit()

        return SqlAlchemyDbGateway._pluck_listen(sql_listen)

    def fetch_listen(self, listen_id: str) -> Listen:
        query = self.session.query(SqlListen)
        query = query.filter(SqlListen.id == listen_id)

        sql_listen = query.one()

        return SqlAlchemyDbGateway._pluck_listen(sql_listen)

    def fetch_listens(self,
                      before_utc: datetime,
                      after_utc: datetime,
                      sort_time: SortOrder,
                      limit: int) -> List[Listen]:
        query = self.session.query(SqlListen)

        query = query.filter(SqlListen.listen_time_utc.between(after_utc, before_utc))

        sql_order_function = SqlAlchemyDbGateway._sql_order_function(sort_time)
        query = query.order_by(sql_order_function(SqlListen.listen_time_utc))

        query = query.limit(limit)

        return SqlAlchemyDbGateway._pluck_listens(cast(Iterable[SqlListen], query))

    @staticmethod
    def _build_sql_listen(listen: Listen) -> SqlListen:
        return SqlListen(
            song_id=listen.song_id,
            song_vendor=listen.song_vendor,
            listener_name=listen.listener_name,
            listen_time_utc=listen.listen_time_utc,
            note=listen.note,
            iana_timezone=listen.iana_timezone
        )

    @staticmethod
    def _pluck_listens(sql_listens: Iterable[SqlListen]) -> List[Listen]:
        return [SqlAlchemyDbGateway._pluck_listen(sql_listen) for sql_listen in sql_listens]

    @staticmethod
    def _pluck_listen(sql_listen: SqlListen) -> Listen:
        return Listen(
            id=sql_listen.id,
            song_id=sql_listen.song_id,
            song_vendor=sql_listen.song_vendor,
            listener_name=sql_listen.listener_name,
            listen_time_utc=sql_listen.listen_time_utc,
            note=sql_listen.note,
            iana_timezone=sql_listen.iana_timezone,
        )

    @staticmethod
    def _sql_order_function(sort_order: SortOrder) -> Callable:
        if sort_order == SortOrder.ASCENDING:
            return asc

        elif sort_order == SortOrder.DESCENDING:
            return desc

        else:
            raise LookupError('Invalid sort_order')

    def persist_schema(self) -> None:
        """Not part of the DbGatewayABC."""
        Base.metadata.create_all(self.engine)
