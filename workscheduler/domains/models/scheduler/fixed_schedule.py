# -*- coding: utf-8 -*-

from datetime import date

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String
from sqlalchemy.types import Date

from mypackages.utils.uuid import UuidFactory
from ..operator import Operator
from .. import OrmBase
from . import WorkCategory

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
    date_from = Column(Date)
    date_to = Column(Date)
    work_categories = relationship("WorkCategory", secondary=associated_work_category_table, lazy='joined')
    participants = relationship("Operator", secondary=associated_participant_table, lazy='joined')
    
    def __init__(self, id_: str, title: str,
                 date_from: date, date_to: date,
                 work_categories: [WorkCategory], participants: [Operator]):
        self.id = id_
        self.title = title
        self.date_from = date_from
        self.date_to = date_to
        self.work_categories = work_categories
        self.participants = participants
        
    @staticmethod
    def new_schedule(title: str, date_from: date, date_to: date,
                     work_categories: [WorkCategory], participants: [Operator]):
        return FixedSchedule(UuidFactory.new_uuid(), title, date_from, date_to,
                             work_categories, participants)
