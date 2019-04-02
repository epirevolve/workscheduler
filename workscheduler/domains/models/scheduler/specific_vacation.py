# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.types import String
from sqlalchemy.types import DateTime
from sqlalchemy.types import Integer

from .. import OrmBase


class Vacation(OrmBase):
    __tablename__ = "vacations"
    id = Column(String, primary_key=True)
    title = Column(String)
    at_from = Column(DateTime)
    at_to = Column(DateTime)
    days = Column(Integer)
