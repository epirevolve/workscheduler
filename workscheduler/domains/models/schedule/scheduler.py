# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.types import (
    String, DateTime, Boolean
)
from sqlalchemy.sql.functions import current_timestamp
from workscheduler.domains.utils.uuid import UuidFactory
from workscheduler.domains.models.user import Belong
from .. import OrmBase


class Scheduler(OrmBase):
    __tablenames__ = 'schedulers'
    id = Column(String, primary_key=True)

