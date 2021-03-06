# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String
from sqlalchemy.types import DateTime
from sqlalchemy.types import Integer
from sqlalchemy.types import Boolean

from utils.date import is_holiday as is_holiday_
from utils.uuid import UuidFactory

from .. import OrmBase
from . import WorkCategory
from . import DayDetail

associated_request_table\
    = Table("associated_request", OrmBase.metadata,
            Column('left_id', String(54), ForeignKey('day_settings.id')),
            Column('right_id', String(54), ForeignKey('requests.id')))


associated_day_details_table\
    = Table("associated_day_details", OrmBase.metadata,
            Column("left_id", String(54), ForeignKey('day_settings.id')),
            Column("right_id", String(54), ForeignKey('day_details.id')))


associated_fixed_schedule_table\
    = Table("associated_fixed_schedule", OrmBase.metadata,
            Column("left_id", String(54), ForeignKey('day_settings.id')),
            Column("right_id", String(54), ForeignKey('fixed_schedules.id')))


class DaySetting(OrmBase):
    __tablename__ = "day_settings"
    id = Column(String(54), primary_key=True)
    day = Column(Integer)
    day_name = Column(String(4))
    is_holiday = Column(Boolean)
    details = relationship("DayDetail", secondary=associated_day_details_table, lazy='immediate')
    requests = relationship("Request", secondary=associated_request_table, lazy='immediate')
    fixed_schedules = relationship("FixedSchedule", secondary=associated_fixed_schedule_table, lazy='immediate')

    def __init__(self, id: str, day: int, day_name: str,
                 is_holiday: bool, details: [],
                 requests: [] = None, fixed_schedules: [] = None, **kwargs):
        self.id = id
        self.day = day
        self.day_name = day_name
        self.is_holiday = is_holiday
        self.details = details
        self.requests = requests or []
        self.fixed_schedules = fixed_schedules or []
    
    def add_category(self, work_category: WorkCategory):
        self.details.append(DayDetail.new(work_category, 0))
    
    @staticmethod
    def new(date: DateTime, date_name: str, work_categories: [WorkCategory]):
        details = [DayDetail.new(x, x.week_day_require if not is_holiday_(date) else x.holiday_require)
                   for x in work_categories]
        return DaySetting(UuidFactory.new_uuid(), date.day, date_name, is_holiday_(date), details)
    
    def __eq__(self, other):
        if other is None or not isinstance(other, DaySetting):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
