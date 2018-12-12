# -*- coding: utf-8 -*-

from datetime import datetime
from sqlalchemy import Column
from sqlalchemy.types import (
    String, DateTime
)
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.orm import validates
from workscheduler.domains.utils.uuid import UuidFactory
from workscheduler.domains.models import OrmBase


class Request(OrmBase):
    __tablename__ = 'requests'
    id = Column(String, primary_key=True)
    name = Column(String(30), nullable=False)
    at_from = Column(DateTime, nullable=False)
    at_to = Column(DateTime, nullable=False)
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id: str, name: str,
                 at_from: datetime, at_to: datetime):
        self.id = id
        self.name = name
        self.at_from = at_from
        self.at_to = at_to
    
    @validates('id', 'name', 'at_from', 'at_to')
    def validate(self, key, value):
        return super(Request, self).validate(Request, key, value)


class RequestFactory:
    @classmethod
    def new_request(cls, name: str, at_from: datetime, at_to: datetime):
        return Request(UuidFactory.new_uuid(), name, at_from, at_to)
