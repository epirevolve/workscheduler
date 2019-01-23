# -*- coding: utf-8 -*-

from sqlalchemy import (
    Column, Table, ForeignKey
)
from sqlalchemy.types import (
    String, DateTime
)
from sqlalchemy.orm import (
    relationship
)
from .. import OrmBase

associated_work_category_table\
    = Table("associated_fixed_schedule_work_category", OrmBase.metadata,
            Column("left_id", String, ForeignKey('fixed_schedules.id')),
            Column("right_id", String, ForeignKey('work_categories.id')))


associated_attendance_table\
    = Table("associated_essential_operator", OrmBase.metadata,
            Column("left_id", String, ForeignKey('fixed_schedules.id')),
            Column("right_id", String, ForeignKey('operators.id')))


class FixedSchedule(OrmBase):
    __tablename__ = "fixed_schedules"
    id = Column(String, primary_key=True)
    title = Column(String)
    date_from = Column(DateTime)
    date_to = Column(DateTime)
    work_categories = relationship("WorkCategory", secondary=associated_work_category_table)
    participants = relationship("Operator", secondary=associated_work_category_table)
