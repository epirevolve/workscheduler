# -*- coding: utf-8 -*-

from datetime import date
from calendar import Calendar as SysCalendar
from calendar import SUNDAY
from calendar import day_abbr

import numpy as np
from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import String
from sqlalchemy.types import DateTime
from sqlalchemy.types import Integer
from sqlalchemy.types import Boolean

from utils.uuid import UuidFactory

from .. import OrmBase
from . import WorkCategory
from . import DaySetting

associated_calendar_day_table\
    = Table("associated_calendar_day", OrmBase.metadata,
            Column("left_id", String(54), ForeignKey('monthly_settings.id')),
            Column("right_id", String(54), ForeignKey('day_settings.id')))


class MonthlySetting(OrmBase):
    __tablename__ = "monthly_settings"
    id = Column(String(54), primary_key=True)
    month = Column(Integer)
    year = Column(Integer)
    days = relationship("DaySetting", secondary=associated_calendar_day_table, lazy='subquery',
                        order_by="asc(DaySetting.day)")
    holidays = Column(Integer)
    is_published = Column(Boolean)
    is_fixed = Column(Boolean)
    create_at = Column(DateTime, server_default=current_timestamp())

    def __init__(self, id: str, month: int, year: int,
                 days: [DaySetting], holidays: int,
                 is_published: bool = False, is_fixed: bool = False, **kwargs):
        self.id = id
        self.month = month
        self.year = year
        self.days = days
        self.holidays = holidays
        self.is_published = is_published
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
        first_day = list(day_abbr).index(self.days[0].day_name)
        padding_left = 0 if first_day == 6 else first_day + 1
        calendar = [None] * padding_left + self.days
        last_day = list(day_abbr).index(self.days[-1].day_name)
        padding_right = last_day if last_day == 6 else 6 - (last_day + 1)
        calendar += [None] * padding_right
        return np.reshape(calendar, (-1, 7)).tolist()
    
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
    def new(work_categories: [], month: int, year: int):
        calendar = SysCalendar()
        calendar.setfirstweekday(SUNDAY)
        monthdatescalendar = [y for x in calendar.monthdatescalendar(year, month)
                              for y in x if y.year == year and y.month == month]
        days = [DaySetting.new(x, day_abbr[x.weekday()], work_categories) for x in monthdatescalendar]
        return MonthlySetting(UuidFactory.new_uuid(), month, year, days,
                              len([x for x in monthdatescalendar if x.weekday() in [5, 6]]))
    
    def __eq__(self, other):
        if other is None or not isinstance(other, MonthlySetting):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
