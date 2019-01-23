# -*- coding: utf-8 -*-

from sqlalchemy import (
    Column, Table, ForeignKey
)
from sqlalchemy.types import (
    String, Boolean, Integer,
    DateTime
)
from workscheduler.domains.models import OrmBase


class Schedule(OrmBase):
    __tablename__ = "schedules"
    id = Column(String, primary_key=True)
