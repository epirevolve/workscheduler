# -*- coding: utf-8 -*-

from workscheduler.domains.utils.uuid import UuidFactory
from workscheduler.domains.models import Base
from sqlalchemy import Column
from sqlalchemy.types import String, DateTime, Integer
from sqlalchemy.sql.functions import current_timestamp


class OperatorSkill(Base):
    __tablename__ = 'operator_skills'
    id = Column(String, primary_key=True)
    name = Column(String(30), nullable=False)
    score = Column(Integer, nullable=False)
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id: str, name: str, score: int):
        self.id = id
        self.name = name
        self.score = score


class OperatorSkillFactory:
    @classmethod
    def evaluate_a_skill(cls, name: str, score: int):
        return OperatorSkill(UuidFactory.new_uuid(), name, score)
