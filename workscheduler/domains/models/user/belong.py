# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.orm import validates
from sqlalchemy.types import (
    String, DateTime
)
from sqlalchemy.sql.functions import current_timestamp
from workscheduler.domains.utils.uuid import UuidFactory
from workscheduler.domains.models import OrmBase


class Belong(OrmBase):
    __tablename__ = 'belongs'
    id = Column(String, primary_key=True)
    name = Column(String(20), nullable=False)
    note = Column(String(50))
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id: str, name: str, note: str):
        self.id = id
        self.name = name
        self.note = note

    @validates('id', 'name')
    def validate(self, key, value):
        return super(Belong, self).validate(Belong, key, value)


class BelongFactory:
    @classmethod
    def create_new_belongs(cls, name: str, note: str):
        belongs = Belong(UuidFactory.new_uuid(), name, note)
        return belongs
