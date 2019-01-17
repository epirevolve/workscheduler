# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.orm import validates
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import (
    String, DateTime, Integer,
    Boolean
)

from mypackages.utils.uuid import UuidFactory
from workscheduler.domains.models import OrmBase


class Skill(OrmBase):
    __tablename__ = 'skills'
    id = Column(String, primary_key=True)
    name = Column(String(30), nullable=False)
    score = Column(Integer, nullable=False)
    is_certified = Column(Boolean)
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id_: str, name: str, score: int,
                 is_certified: bool):
        self.id = id_
        self.name = name
        self.score = score
        self.is_certified = is_certified
        
    @validates('id', 'name', 'score')
    def validate(self, key, value):
        return super(Skill, self).validate(Skill, key, value)

    @staticmethod
    def new_certified_skill(name: str, score: int):
        return Skill(UuidFactory.new_uuid(), name, score, True)
    
    @staticmethod
    def new_not_certified_skill(name: str, score: int):
        return Skill(UuidFactory.new_uuid(), name, score, False)
