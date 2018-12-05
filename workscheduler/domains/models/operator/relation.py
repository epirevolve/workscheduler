# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.types import (
    String, Float
)
from sqlalchemy.orm import validates
from workscheduler.domains.utils.uuid import UuidFactory
from workscheduler.domains.models import OrmBase


class Relation(OrmBase):
    __tablename__ = 'relations'
    id = Column(String, primary_key=True)
    myself_id = Column(String, nullable=False)
    colleague_id = Column(String, nullable=False)
    affinity = Column(Float, default=0.0)
    
    def __init__(self, id: str, myself_id: str, colleague_id: str, affinity: float):
        self.id = id
        self.myself_id = myself_id
        self.colleague_id = colleague_id
        self.affinity = affinity

    @validates('id', 'myself_id', 'colleague_id')
    def validate(self, key, value):
        return super(Relation, self).validate(Relation, key, value)
