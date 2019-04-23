# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String
from sqlalchemy.types import Integer

from mypackages.utils.uuid import UuidFactory

from ..operator import Operator
from .. import OrmBase
from . import DayWorkCategory


associated_day_work_category_table\
    = Table("associated_day_work_category", OrmBase.metadata,
            Column("left_id", String, ForeignKey('schedules.id')),
            Column("right_id", String, ForeignKey('day_work_categories.id')))


class Schedule(OrmBase):
    __tablename__ = "schedules"
    id = Column(String, primary_key=True)
    _operator_id = Column(String, ForeignKey('operators.id'))
    operator = relationship("Operator", uselist=False, lazy='subquery')
    affiliation_id = Column(String)
    year = Column(Integer)
    month = Column(Integer)
    day_work_categories = relationship('DayWorkCategory', secondary=associated_day_work_category_table, lazy='subquery')
    
    def __init__(self, id_: str, operator: Operator, affiliation_id: str,
                 year: int, month: int, day_work_categories: []):
        self.id = id_
        self.operator = operator
        self.affiliation_id = affiliation_id
        self.year = year
        self.month = month
        self.day_work_categories = day_work_categories
    
    @staticmethod
    def new_schedule(operator: Operator, affiliation_id: str, year: int,
                     month: int, schedule: []):
        return Schedule(UuidFactory.new_uuid(), operator, affiliation_id,
                        year, month,
                        [DayWorkCategory.new_day_work_category(i+1, x) for i, x in enumerate(schedule)])
    
    def __eq__(self, other):
        if other is None or not isinstance(other, Schedule):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
