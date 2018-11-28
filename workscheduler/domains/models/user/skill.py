# -*- coding: utf-8 -*-

from workscheduler.domains.utils.uuid import UuidFactory
from workscheduler.domains.models import Base
from sqlalchemy import Column
from sqlalchemy.types import (
    String, DateTime, Integer
)
from sqlalchemy.sql.functions import current_timestamp


class Skill(Base):
    __tablename__ = 'skills'
    id = Column(String, primary_key=True)
    name = Column(String(30), nullable=False)
    score = Column(Integer, nullable=False)
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id: str, name: str, score: int):
        self.id = id
        self.name = name
        self.score = score


class SkillFactory:
    @classmethod
    def evaluate_a_skill(cls, name: str, score: int):
        return Skill(UuidFactory.new_uuid(), name, score)
