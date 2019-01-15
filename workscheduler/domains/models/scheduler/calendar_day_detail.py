# -*- coding: utf-8 -*-

from sqlalchemy import (
    Column, Table, ForeignKey
)
from sqlalchemy.types import (
    String, Integer
)
from sqlalchemy.orm import (
    relationship
)
from utils.uuid import UuidFactory
from .. import OrmBase
from . import WorkCategory


associated_work_category_table\
    = Table("associated_calendar_date_detail_work_category", OrmBase.metadata,
            Column("left_id", String, ForeignKey('calendar_day_details.id')),
            Column("right_id", String, ForeignKey('work_categories.id')))


class CalendarDayDetail(OrmBase):
    __tablename__ = "calendar_day_details"
    id = Column(String, primary_key=True)
    _work_category_id = Column(String, ForeignKey('work_categories.id'))
    work_category = relationship("WorkCategory", uselist=False)
    require = Column(Integer)

    def __init__(self, id: str, work_category: WorkCategory,
                 require: int):
        self.id = id
        self.work_category = work_category
        self.require = require

    @staticmethod
    def new_detail(work_category: WorkCategory, require: int):
        return CalendarDayDetail(UuidFactory.new_uuid(), work_category, require)
