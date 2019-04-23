# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String
from sqlalchemy.types import Integer

from mypackages.utils.uuid import UuidFactory

from .. import OrmBase
from . import WorkCategory

associated_work_category_table\
    = Table("associated_day_detail_work_category", OrmBase.metadata,
            Column("left_id", String, ForeignKey('day_details.id')),
            Column("right_id", String, ForeignKey('work_categories.id')))


class DayDetail(OrmBase):
    __tablename__ = "day_details"
    id = Column(String, primary_key=True)
    _work_category_id = Column(String, ForeignKey('work_categories.id'))
    work_category = relationship("WorkCategory", uselist=False, lazy='subquery')
    require = Column(Integer)

    def __init__(self, id_: str, work_category: WorkCategory,
                 require: int):
        self.id = id_
        self.work_category = work_category
        self.require = require

    @staticmethod
    def new_detail(work_category: WorkCategory, require: int):
        return DayDetail(UuidFactory.new_uuid(), work_category, require)
    
    def __eq__(self, other):
        if other is None or not isinstance(other, DayDetail):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
