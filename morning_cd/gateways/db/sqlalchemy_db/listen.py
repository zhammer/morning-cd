from datetime import datetime

from sqlalchemy import Table, Column, DateTime, Integer, String
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class Listen(Base):
    __tablename__ = 'listens'

    id = Column(Integer(), primary_key=True)

    song_id = Column(String(50), nullable=False)
    song_vendor = Column(String(10), nullable=False)

    listener_name = Column(String(30), nullable=False)
    note = Column(String(100), nullable=True)

    listen_time_utc = Column(DateTime(), nullable=False, index=True)
    iana_timezone = Column(String(40), nullable=False)

    created_at_utc = Column(DateTime(), nullable=False, default=datetime.utcnow)
    updated_on_utc = Column(DateTime(), default=datetime.utcnow, onupdate=datetime.utcnow)
