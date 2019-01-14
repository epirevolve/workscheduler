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


associated_daily_info_table\
    = Table("associated_daily_info", OrmBase.metadata,
            Column("left_id", String, ForeignKey('monthly_info.id')),
            Column("right_id", String, ForeignKey('daily_info.id')))


class MonthlyInfo(OrmBase):
    __tablename__ = "monthly_info"
    id = Column(String, primary_key=True)
    year = Column(Integer)
    month = Column(Integer)
    daily_info = relationship("DailyInfo", secondary=associated_daily_info_table)
    create_at = Column(DateTime, server_default=current_timestamp())
