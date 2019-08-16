# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.types import String
from sqlalchemy.types import Integer

from utils.uuid import UuidFactory

from .. import OrmBase


class DayWorkCategory(OrmBase):
    __tablename__ = "day_work_categories"
    id = Column(String(54), primary_key=True)
    day = Column(Integer)
    work_category_id = Column(String(54))
    
    def __init__(self, id: str, day: int, work_category_id: str,
                 **kwargs):
        self.id = id
        self.day = day
        self.work_category_id = work_category_id
    
    @staticmethod
    def new(day: int, work_category_id: str):
        return DayWorkCategory(UuidFactory.new_uuid(), day, work_category_id)
    
    def __eq__(self, other):
        if other is None or not isinstance(other, DayWorkCategory):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
