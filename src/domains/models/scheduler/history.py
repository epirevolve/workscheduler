# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import String
from sqlalchemy.types import DateTime
from sqlalchemy.types import Integer

from utils.uuid import UuidFactory

from .. import OrmBase


class History(OrmBase):
    __tablename__ = "scheduler_histories"
    id = Column(String, primary_key=True)
    month = Column(Integer)
    year = Column(Integer)
    adaptability = Column(Integer)
    create_at = Column(DateTime, server_default=current_timestamp())

    def __init__(self, id: str, month: int, year: int,
                 adaptability: int, **kwargs):
        self.id = id
        self.month = month
        self.year = year
        self.adaptability = adaptability

    @staticmethod
    def new(month: int, year: int, adaptability: int):
        return History(UuidFactory.new_uuid(), month, year, adaptability)

    def __eq__(self, other):
        if other is None or not isinstance(other, History):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
