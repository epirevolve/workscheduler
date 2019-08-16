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
            Column("left_id", String(54), ForeignKey('schedules.id')),
            Column("right_id", String(54), ForeignKey('schedule_components.id')))


class Schedule(OrmBase):
    __tablename__ = "schedules"
    id = Column(String(54), primary_key=True)
    team_id = Column(String(54))
    month = Column(Integer)
    year = Column(Integer)
    components = relationship('ScheduleComponent', secondary=associated_component_table,
                              lazy='subquery', cascade='all', order_by="asc(ScheduleComponent._operator_id)")
    is_published = Column(Boolean)
    
    def __init__(self, id: str, team_id: str, month: int,
                 year: int, components: [], is_published: bool = False):
        self.id = id
        self.team_id = team_id
        self.month = month
        self.year = year
        self.components = components
        self.is_published = is_published
    
    @staticmethod
    def new(team_id: str, month: int, year: int,
            schedule_components: []):
        return Schedule(UuidFactory.new_uuid(), team_id, month,
                        year, schedule_components)
    
    def __eq__(self, other):
        if other is None or not isinstance(other, Schedule):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
