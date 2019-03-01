# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.orm import validates
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import String
from sqlalchemy.types import DateTime
from sqlalchemy.types import Integer
from sqlalchemy.types import Boolean

from mypackages.utils.uuid import UuidFactory
from .. import OrmBase


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
    def new_skill(name: str, score: int, is_certified: bool):
        return Skill(UuidFactory.new_uuid(), name, score, is_certified)
