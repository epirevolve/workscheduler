# -*- coding: utf-8 -*-

from workscheduler.domains.utils.uuid import UuidFactory
from workscheduler.domains.models import Base
from sqlalchemy import Column
from sqlalchemy.types import (
    String, Float
)


class Relation(Base):
    __tablename__ = 'relations'
    id = Column(String, primary_key=True)
    user_1 = Column(String, nullable=False)
    user_2 = Column(String, nullable=False)
    affinity = Column(Float, default=0.0)
    looked_by = Column(String, nullable=False)
    
    def __init__(self, id: str, user_1: str, user_2: str, affinity: float, looked_by: str):
        self.id = id
        self.user_1 = user_1
        self.user_2 = user_2
        self.affinity = affinity
        self.looked_by = looked_by
