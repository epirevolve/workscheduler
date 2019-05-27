# -*- coding: utf-8 -*-

from datetime import date
from datetime import time

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String
from sqlalchemy.types import Date
from sqlalchemy.types import Time

from mypackages.utils.uuid import UuidFactory
from ..operator import Operator
from .. import OrmBase

associated_work_category_table\
    = Table("associated_fixed_schedule_work_category", OrmBase.metadata,
            Column("left_id", String, ForeignKey('fixed_schedules.id')),
            Column("right_id", String, ForeignKey('work_categories.id')))


associated_participant_table\
    = Table("associated_participant", OrmBase.metadata,
            Column("left_id", String, ForeignKey('fixed_schedules.id')),
            Column("right_id", String, ForeignKey('operators.id')))


class FixedSchedule(OrmBase):
    __tablename__ = "fixed_schedules"
    id = Column(String, primary_key=True)
    title = Column(String)
    on_from = Column(Date)
    on_to = Column(Date)
    at_from = Column(Time)
    at_to = Column(Time)
    participants = relationship("Operator", secondary=associated_participant_table, lazy='subquery')
    
    def __init__(self, id: str, title: str,
                 on_from: date, on_to: date,
                 at_from: time, at_to: time,
                 participants: [Operator], **kwargs):
        self.id = id
        self.title = title
        self.on_from = on_from
        self.on_to = on_to
        self.at_from = at_from
        self.at_to = at_to
        self.participants = participants
        
    @staticmethod
    def new(title: str, on_from: date, on_to: date,
            at_from: time, at_to: time, participants: [Operator]):
        return FixedSchedule(UuidFactory.new_uuid(), title, on_from, on_to,
                             at_from, at_to, participants)
    
    def __eq__(self, other):
        if other is None or not isinstance(other, FixedSchedule):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
