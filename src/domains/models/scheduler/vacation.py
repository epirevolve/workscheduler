# -*- coding: utf-8 -*-

from datetime import datetime

from sqlalchemy import Column
from sqlalchemy.types import String
from sqlalchemy.types import Date
from sqlalchemy.types import Integer

from utils.uuid import UuidFactory

from .. import OrmBase


class Vacation(OrmBase):
    __tablename__ = "vacations"
    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    on_from = Column(Date)
    on_to = Column(Date)
    days_count = Column(Integer)
    
    def __init__(self, id: str, title: str,
                 on_from: datetime, on_to: datetime, days_count: int, **kwargs):
        self.id = id
        self.title = title
        self.on_from = on_from
        self.on_to = on_to
        self.days_count = days_count
    
    @staticmethod
    def new(title: str, on_from: datetime,
            on_to: datetime, days_count: int):
        return Vacation(UuidFactory.new_uuid(), title, on_from,
                        on_to, days_count)
    
    def __eq__(self, other):
        if other is None or not isinstance(other, Vacation):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
