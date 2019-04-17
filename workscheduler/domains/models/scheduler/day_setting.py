# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String
from sqlalchemy.types import DateTime
from sqlalchemy.types import Integer

from mypackages.utils.date import is_holiday
from mypackages.utils.uuid import UuidFactory

from .. import OrmBase
from . import WorkCategory
from . import DayDetail

associated_request_table\
    = Table("associated_request", OrmBase.metadata,
            Column('left_id', String, ForeignKey('day_settings.id')),
            Column('right_id', String, ForeignKey('requests.id')))


associated_day_details_table\
    = Table("associated_day_details", OrmBase.metadata,
            Column("left_id", String, ForeignKey('day_settings.id')),
            Column("right_id", String, ForeignKey('day_details.id')))


associated_fixed_schedule_table\
    = Table("associated_fixed_schedule", OrmBase.metadata,
            Column("left_id", String, ForeignKey('day_settings.id')),
            Column("right_id", String, ForeignKey('fixed_schedules.id')))


class DaySetting(OrmBase):
    __tablename__ = "day_settings"
    id = Column(String, primary_key=True)
    day = Column(Integer)
    day_name = Column(String)
    details = relationship("DayDetail", secondary=associated_day_details_table, lazy='joined')
    requests = relationship("Request", secondary=associated_request_table, lazy='joined')
    fixed_schedules = relationship("FixedSchedule", secondary=associated_fixed_schedule_table, lazy='joined')

    def __init__(self, id_: str, day: int, day_name: str,
                 details: []):
        self.id = id_
        self.day = day
        self.day_name = day_name
        self.details = details
        self.requests = []
        self.fixed_schedules = []
    
    def add_category(self, work_catgory: WorkCategory):
        self.details.append(DayDetail.new_detail(work_catgory, 0))
        
    @staticmethod
    def new_day(date: DateTime, date_name: str, work_categories: [WorkCategory]):
        details = [DayDetail.new_detail(x, x.week_day_require if not is_holiday(date) else x.holiday_require)
                   for x in work_categories]
        return DaySetting(UuidFactory.new_uuid(), date.day, date_name, details)
