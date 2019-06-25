# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import String
from sqlalchemy.types import DateTime
from sqlalchemy.types import Integer

from utils.uuid import UuidFactory

from domains.models.user import Team
from .. import OrmBase


class History(OrmBase):
    __tablename__ = "scheduler_histories"
    id = Column(String, primary_key=True)
    _team_id = Column(String, ForeignKey('teams.id'))
    team = relationship("Team", uselist=False, lazy='subquery')
    month = Column(Integer)
    year = Column(Integer)
    adaptability = Column(Integer)
    create_at = Column(DateTime, server_default=current_timestamp())

    def __init__(self, id: str, team: Team, month: int, year: int,
                 adaptability: int, **kwargs):
        self.id = id
        self.team = team
        self.month = month
        self.year = year
        self.adaptability = adaptability

    @staticmethod
    def new(team: Team, month: int, year: int, adaptability: int):
        return History(UuidFactory.new_uuid(), team, month, year, adaptability)

    def __eq__(self, other):
        if other is None or not isinstance(other, History):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
