# -*- coding: utf-8 -*-

from sqlalchemy import (
    Column, Table, ForeignKey
)
from sqlalchemy.types import (
    String, Boolean, DateTime,
    Integer
)
from sqlalchemy.orm import (
    relationship, validates
)
from sqlalchemy.sql.functions import current_timestamp
from workscheduler.domains.utils.uuid import UuidFactory
from workscheduler.domains.models.user import Belong
from .. import OrmBase


associated_work_category_table\
    = Table("associated_daily_detail_work_category", OrmBase.metadata,
            Column("left_id", String, ForeignKey('daily_details.id')),
            Column("right_id", String, ForeignKey('work_categories.id')))


class DailyDetail(OrmBase):
    __tablename__ = "daily_details"
    id = Column(String, primary_key=True)
    require = Column(Integer)
