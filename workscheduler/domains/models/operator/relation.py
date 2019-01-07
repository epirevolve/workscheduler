# -*- coding: utf-8 -*-

from sqlalchemy import (
    Column, ForeignKey
)
from sqlalchemy.types import (
    String, Float
)
from sqlalchemy.orm import (
    relationship, validates
)
from workscheduler.domains.utils.uuid import UuidFactory
from workscheduler.domains.models import OrmBase
from workscheduler.domains.models.operator import Operator


class Relation(OrmBase):
    __tablename__ = 'relations'
    id = Column(String, primary_key=True)
    _myself_id = Column(String, ForeignKey('operators.id'))
    myself = relationship("Operator", uselist=False, foreign_keys=[_myself_id])
    _colleague_id = Column(String, ForeignKey('operators.id'))
    colleague = relationship("Operator", uselist=False, foreign_keys=[_colleague_id])
    affinity = Column(Float, default=0.0)
    
    def __init__(self, id: str, myself: Operator, colleague: Operator, affinity: float):
        self.id = id
        self.myself = myself
        self.colleague = colleague
        self.affinity = affinity

    @validates('id', 'myself_id', 'colleague_id')
    def validate(self, key, value):
        return super(Relation, self).validate(Relation, key, value)
    
    @staticmethod
    def new_relation(myself: Operator, colleage: Operator, affinity: int):
        return Relation(UuidFactory.new_uuid(), myself, colleage, affinity)
