# -*- coding: utf-8 -*-

from calendar import (
    Calendar as SysCalendar, SUNDAY, day_abbr
)

from sqlalchemy import (
    Column, Table, ForeignKey
)
from sqlalchemy.orm import (
    relationship
)
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import (
    String, DateTime, Integer,
    Boolean
)

from mypackages.utils.uuid import UuidFactory
from workscheduler.domains.models.user import Affiliation
from . import CalendarDay
from .. import OrmBase

associated_calendar_days_table\
    = Table("associated_calendar_days", OrmBase.metadata,
            Column("left_id", String, ForeignKey('calendars.id')),
            Column("right_id", String, ForeignKey('calendar_days.id')))


class Calendar(OrmBase):
    __tablename__ = "calendars"
    id = Column(String, primary_key=True)
    _affiliation_id = Column(String, ForeignKey('affiliations.id'))
    affiliation = relationship("Affiliation", uselist=False)
    year = Column(Integer)
    month = Column(Integer)
    days = relationship("CalendarDay", secondary=associated_calendar_days_table)
    holidays = Column(Integer)
    is_fixed = Column(Boolean)
    create_at = Column(DateTime, server_default=current_timestamp())

    def __init__(self, id_: str, affiliation: Affiliation,
                 year: int, month: int, days: [CalendarDay],
                 holidays: int, fixed_schedule: [], is_fixed: bool):
        self.id = id_
        self.affiliation = affiliation
        self.year = year
        self.month = month
        self.days = days
        self.holidays = holidays
        self.fixed_schedule = fixed_schedule
        self.is_fixed = is_fixed
        
    @property
    def categories(self):
        return [{'requires': [z.require for z in y], 'category': y[0].work_category}
                for y in zip(*[x.details for x in self.days])]
    
    @staticmethod
    def new_month_year(affiliation: Affiliation, work_categories: [],
                       year: int, month: int, fixed_schedule, holidays: int):
        calendar = SysCalendar()
        calendar.setfirstweekday(SUNDAY)
        days = [CalendarDay.new_day(y, day_abbr[y.weekday()], work_categories)
                for x in calendar.monthdatescalendar(year, month)
                for y in x if y.year == year and y.month == month]
        return Calendar(UuidFactory.new_uuid(), affiliation,
                        year, month, days,
                        holidays, fixed_schedule, is_fixed=False)
