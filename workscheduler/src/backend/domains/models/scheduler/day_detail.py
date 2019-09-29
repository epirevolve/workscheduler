# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String
from sqlalchemy.types import Integer

from utils.uuid import UuidFactory

from .. import OrmBase
from . import WorkCategory

associated_work_category_table\
    = Table("associated_day_detail_work_category", OrmBase.metadata,
            Column("left_id", String(54), ForeignKey('day_details.id')),
            Column("right_id", String(54), ForeignKey('work_categories.id')))


class DayDetail(OrmBase):
    __tablename__ = "day_details"
    id = Column(String(54), primary_key=True)
    _work_category_id = Column(String(54), ForeignKey('work_categories.id'))
    work_category = relationship("WorkCategory", uselist=False, lazy='immediate')
    require = Column(Integer)

    def __init__(self, id: str, work_category: WorkCategory, require: int, **kwargs):
        self.id = id
        self.work_category = work_category
        self.require = require

    @staticmethod
    def new(work_category: WorkCategory, require: int):
        return DayDetail(UuidFactory.new_uuid(), work_category, require)
    
    def __eq__(self, other):
        if other is None or not isinstance(other, DayDetail):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
