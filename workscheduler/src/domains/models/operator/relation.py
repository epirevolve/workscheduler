# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.orm import validates
from sqlalchemy.types import String
from sqlalchemy.types import Float

from utils.uuid import UuidFactory
from .. import OrmBase


class Relation(OrmBase):
    __tablename__ = 'relations'
    id = Column(String(54), primary_key=True)
    _myself_id = Column(String(54), ForeignKey('operators.id'))
    myself = relationship("Operator", uselist=False, foreign_keys=[_myself_id], lazy='immediate')
    _colleague_id = Column(String(54), ForeignKey('operators.id'))
    colleague = relationship("Operator", uselist=False, foreign_keys=[_colleague_id], lazy='immediate')
    affinity = Column(Float, default=0.0)
    
    def __init__(self, id: str, myself, colleague, affinity: float, **kwargs):
        self.id = id
        self.myself = myself
        self.colleague = colleague
        self.affinity = affinity

    @validates('id', 'myself_id', 'colleague_id')
    def validate(self, key, value):
        return super(Relation, self).validate(Relation, key, value)
    
    @staticmethod
    def new(myself, colleague, affinity: int):
        return Relation(UuidFactory.new_uuid(), myself, colleague, affinity)
