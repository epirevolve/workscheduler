# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.types import (
    String, DateTime, Integer
)
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.orm import validates
from workscheduler.domains.utils.uuid import UuidFactory
from workscheduler.domains.models import OrmBase


class Skill(OrmBase):
    __tablename__ = 'skills'
    id = Column(String, primary_key=True)
    name = Column(String(30), nullable=False)
    score = Column(Integer, nullable=False)
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id: str, name: str, score: int):
        self.id = id
        self.name = name
        self.score = score
        
    @validates('id', 'name', 'score')
    def validate(self, key, value):
        return super(Skill, self).validate(Skill, key, value)

    @staticmethod
    def evaluate_a_skill(name: str, score: int):
        return Skill(UuidFactory.new_uuid(), name, score)
