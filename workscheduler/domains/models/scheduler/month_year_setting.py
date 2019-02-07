# -*- coding: utf-8 -*-

from datetime import date
from calendar import Calendar as SysCalendar
from calendar import SUNDAY
from calendar import day_abbr

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import String
from sqlalchemy.types import DateTime
from sqlalchemy.types import Integer
from sqlalchemy.types import Boolean

from mypackages.utils.uuid import UuidFactory

from .. import OrmBase
from . import (
    WorkCategory, DaySetting
)

associated_request_table\
    = Table("associated_request", OrmBase.metadata,
            Column('left_id', String, ForeignKey('month_year_settings.id')),
            Column('right_id', String, ForeignKey('requests.id')))


associated_calendar_day_table\
    = Table("associated_calendar_day", OrmBase.metadata,
            Column("left_id", String, ForeignKey('month_year_settings.id')),
            Column("right_id", String, ForeignKey('day_settings.id')))


associated_fixed_schedule_table\
    = Table("associated_fixed_schedule", OrmBase.metadata,
            Column("left_id", String, ForeignKey('month_year_settings.id')),
            Column("right_id", String, ForeignKey('fixed_schedules.id')))


class MonthYearSetting(OrmBase):
    __tablename__ = "month_year_settings"
    id = Column(String, primary_key=True)
    year = Column(Integer)
    month = Column(Integer)
    days = relationship("DaySetting", secondary=associated_calendar_day_table)
    holidays = Column(Integer)
    requests = relationship("Request", secondary=associated_request_table)
    fixed_schedules = relationship("FixedSchedule", secondary=associated_fixed_schedule_table)
    is_publish = Column(Boolean)
    is_fixed = Column(Boolean)
    create_at = Column(DateTime, server_default=current_timestamp())

    def __init__(self, id_: str, year: int, month: int,
                 days: [DaySetting], holidays: int, requests: [],
                 fixed_schedules: [], is_publish: bool, is_fixed: bool):
        self.id = id_
        self.year = year
        self.month = month
        self.days = days
        self.holidays = holidays
        self.requests = requests
        self.fixed_schedules = fixed_schedules
        self.is_publish = is_publish
        self.is_fixed = is_fixed
        
    @property
    def categories(self):
        return [{'requires': [z.require for z in y], 'category': y[0].work_category}
                for y in zip(*[x.details for x in self.days])]

    @property
    def schedule_of(self):
        return date(self.year, self.month, 1)
    
    @property
    def as_calendar(self):
        return None
    
    def update_categories(self, work_categories: [WorkCategory]):
        work_category_ids = [x.id for x in work_categories]
        for category in [x for x in self.categories if x['category'].id not in work_category_ids]:
            for require in category['requires']:
                self.days.remove(require)
        category_ids = [x['category'].id for x in self.categories]
        for work_category in [x for x in work_categories if x.id not in category_ids]:
            for day in self.days:
                day.add_category(work_category)

    @staticmethod
    def new_month_year(work_categories: [], year: int, month: int):
        calendar = SysCalendar()
        calendar.setfirstweekday(SUNDAY)
        monthdatescalendar = [y for x in calendar.monthdatescalendar(year, month)
                              for y in x if y.year == year and y.month == month]
        days = [DaySetting.new_day(x, day_abbr[x.weekday()], work_categories)
                for x in monthdatescalendar]
        return MonthYearSetting(UuidFactory.new_uuid(),
                                year, month, days,
                                len([x for x in monthdatescalendar if x.weekday() in [5, 6]]),
                                [], [], is_publish=False, is_fixed=False)
