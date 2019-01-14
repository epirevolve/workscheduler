# -*- coding: utf-8 -*-

from calendar import (
    Calendar as SysCalendar, SUNDAY, day_abbr
)
from sqlalchemy import (
    Column, Table, ForeignKey
)
from sqlalchemy.types import (
    String, DateTime, Integer
)
from sqlalchemy.orm import (
    relationship
)
from sqlalchemy.sql.functions import current_timestamp
from utils.uuid import UuidFactory
from workscheduler.domains.models.user import Belong
from .. import OrmBase
from . import CalendarDay


associated_calendar_days_table\
    = Table("associated_calendar_days", OrmBase.metadata,
            Column("left_id", String, ForeignKey('calendars.id')),
            Column("right_id", String, ForeignKey('calendar_days.id')))


class Calendar(OrmBase):
    __tablename__ = "calendars"
    id = Column(String, primary_key=True)
    _belong_id = Column(String, ForeignKey('belongs.id'))
    belong = relationship("Belong", uselist=False)
    year = Column(Integer)
    month = Column(Integer)
    calendar_days = relationship("CalendarDay", secondary=associated_calendar_days_table)
    usual_holidays = Column(Integer)
    create_at = Column(DateTime, server_default=current_timestamp())

    def __init__(self, id: str, belong: Belong,
                 year: int, month: int, calendar_days: [],
                 usual_holidays: int):
        self.id = id
        self.belong = belong
        self.year = year
        self.month = month
        self.calendar_days = calendar_days
        self.usual_holidays = usual_holidays

    @staticmethod
    def new_month_year(belong: Belong, work_categories: [],
                       year: int, month: int, usual_holidays: int):
        calendar = SysCalendar()
        calendar.setfirstweekday(SUNDAY)
        days = [CalendarDay.new_day(y, day_abbr[y.weekday()], work_categories)
                for x in calendar.monthdatescalendar(year, month)
                for y in x if y.year == year and y.month == month]
        return Calendar(UuidFactory.new_uuid(), belong,
                        year, month, days, usual_holidays)
