# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String

from utils.uuid import UuidFactory

from ..operator import Operator
from .. import OrmBase
from . import DayWorkCategory


associated_category_table\
    = Table("associated_day_work_category", OrmBase.metadata,
            Column("left_id", String(54), ForeignKey('schedule_components.id')),
            Column("right_id", String(54), ForeignKey('day_work_categories.id')))


class ScheduleComponent(OrmBase):
    __tablename__ = "schedule_components"
    id = Column(String(54), primary_key=True)
    _operator_id = Column(String(54), ForeignKey('operators.id'))
    operator = relationship("Operator", uselist=False, lazy='subquery')
    day_work_categories = relationship('DayWorkCategory', secondary=associated_category_table, lazy='subquery',
                                       order_by="asc(DayWorkCategory.day)")
    
    def __init__(self, id: str, operator: Operator, day_work_categories: [],
                 **kwargs):
        self.id = id
        self.operator = operator
        self.day_work_categories = day_work_categories
    
    @staticmethod
    def new(operator: Operator, schedule: []):
        day_work_categories = [DayWorkCategory.new(i + 1, x) for i, x in enumerate(schedule)]
        return ScheduleComponent(UuidFactory.new_uuid(), operator, day_work_categories)
    
    def __eq__(self, other):
        if other is None or not isinstance(other, ScheduleComponent):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
