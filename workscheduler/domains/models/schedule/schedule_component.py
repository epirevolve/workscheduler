# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String
from sqlalchemy.types import Integer
from sqlalchemy.types import Boolean

from mypackages.utils.uuid import UuidFactory

from ..operator import Operator
from .. import OrmBase
from . import DayWorkCategory


associated_category_table\
    = Table("associated_day_work_category", OrmBase.metadata,
            Column("left_id", String, ForeignKey('schedule_components.id')),
            Column("right_id", String, ForeignKey('day_work_categories.id')))


class ScheduleComponent(OrmBase):
    __tablename__ = "schedule_components"
    id = Column(String, primary_key=True)
    _operator_id = Column(String, ForeignKey('operators.id'))
    operator = relationship("Operator", uselist=False, lazy='subquery')
    day_work_categories = relationship('DayWorkCategory', secondary=associated_category_table, lazy='subquery')
    
    def __init__(self, id_: str, operator: Operator, day_work_categories: []):
        self.id = id_
        self.operator = operator
        self.day_work_categories = day_work_categories
    
    @staticmethod
    def new_schedule_component(operator: Operator, schedule: []):
        day_work_categories = [DayWorkCategory.new_day_work_category(i+1, x) for i, x in enumerate(schedule)]
        return ScheduleComponent(UuidFactory.new_uuid(), operator, day_work_categories)
    
    def __eq__(self, other):
        if other is None or not isinstance(other, ScheduleComponent):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
