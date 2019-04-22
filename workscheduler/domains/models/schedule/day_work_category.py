# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.types import String
from sqlalchemy.types import Integer

from mypackages.utils.uuid import UuidFactory

from .. import OrmBase


class DayWorkCategory(OrmBase):
    __tablename__ = "day_work_categories"
    id = Column(String, primary_key=True)
    day = Column(Integer)
    work_category = Column(String)
    
    def __init__(self, id_: str, day: int, work_category: str):
        self.id = id_
        self.day = day
        self.work_category = work_category
    
    @staticmethod
    def new_day_work_category(day: int, work_category: str):
        return DayWorkCategory(UuidFactory.new_uuid(), day, work_category)
    
    def __eq__(self, other):
        if other is None or not isinstance(other, DayWorkCategory):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
