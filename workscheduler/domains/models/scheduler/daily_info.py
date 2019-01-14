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


associated_daily_detail_table\
    = Table("associated_daily_detail", OrmBase.metadata,
            Column("left_id", String, ForeignKey('daily_info.id')),
            Column("right_id", String, ForeignKey('daily_details.id')))


class DailyInfo(OrmBase):
    __tablename__ = "daily_info"
    id = Column(String, primary_key=True)
    date = Column(Integer)
    daily_details = relationship("DailyDetail", secondary=associated_daily_detail_table)
