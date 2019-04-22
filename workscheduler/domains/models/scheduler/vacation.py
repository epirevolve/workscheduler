# -*- coding: utf-8 -*-

from datetime import datetime

from sqlalchemy import Column
from sqlalchemy.types import String
from sqlalchemy.types import DateTime
from sqlalchemy.types import Integer

from mypackages.utils.uuid import UuidFactory

from .. import OrmBase


class Vacation(OrmBase):
    __tablename__ = "vacations"
    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    on_from = Column(DateTime)
    on_to = Column(DateTime)
    days = Column(Integer)
    
    def __init__(self, id_: str, title: str,
                 on_from: datetime, on_to: datetime, days: int):
        self.id = id_
        self.title = title
        self.on_from = on_from
        self.on_to = on_to
        self.days = days
    
    @staticmethod
    def new_vacation(title: str, on_from: datetime,
                     on_to: datetime, days: int):
        return Vacation(UuidFactory.new_uuid(), title, on_from,
                        on_to, days)
    
    def __eq__(self, other):
        if other is None or not isinstance(other, Vacation):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
