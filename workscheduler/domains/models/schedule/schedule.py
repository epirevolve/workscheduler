# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.types import String

from .. import OrmBase


class Schedule(OrmBase):
    __tablename__ = "schedules"
    id = Column(String, primary_key=True)
