# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.orm import validates
from sqlalchemy.types import (
    String, DateTime, Boolean
)
from sqlalchemy.sql.functions import current_timestamp
from workscheduler.domains.utils.uuid import UuidFactory
from workscheduler.domains.models import OrmBase


class Belongs(OrmBase):
    __tablename__ = 'belongs'
    id = Column(String, primary_key=True)
    name = Column(String(20), nullable=False)
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id: str, name: str):
        self.id = id
        self.name = name

    @validates('id', 'name')
    def validate(self, key, value):
        return super(Belongs, self).validate(Belongs, key, value)


class BelongsFactory:
    @classmethod
    def create_new_belongs(cls, name: str):
        belongs = Belongs(UuidFactory.new_uuid(), name)
        return belongs
