# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.types import (
    String
)

from .. import OrmBase


class SpecificVacation(OrmBase):
    __tablename__ = "specific_vacation"
    id = Column(String, primary_key=True)
