# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String
from sqlalchemy.types import Integer
from sqlalchemy.types import Boolean

from utils.uuid import UuidFactory

from .. import OrmBase


associated_component_table\
    = Table("associated_schedule_component", OrmBase.metadata,
            Column("left_id", String, ForeignKey('schedules.id')),
            Column("right_id", String, ForeignKey('schedule_components.id')))


class Schedule(OrmBase):
    __tablename__ = "schedules"
    id = Column(String, primary_key=True)
    affiliation_id = Column(String)
    year = Column(Integer)
    month = Column(Integer)
    components = relationship('ScheduleComponent', secondary=associated_component_table,
                              lazy='subquery', cascade='all')
    is_published = Column(Boolean)
    
    def __init__(self, id: str, affiliation_id: str, month: int,
                 year: int, schedule_components: []):
        self.id = id
        self.affiliation_id = affiliation_id
        self.year = year
        self.month = month
        self.components = schedule_components
        self.is_published = False
    
    @staticmethod
    def new(affiliation_id: str, month: int, year: int,
            schedule_components: []):
        return Schedule(UuidFactory.new_uuid(), affiliation_id, month,
                        year, schedule_components)
    
    def __eq__(self, other):
        if other is None or not isinstance(other, Schedule):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
