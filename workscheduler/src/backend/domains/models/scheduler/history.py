# -*- coding: utf-8 -*-

import enum

from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import String
from sqlalchemy.types import DateTime
from sqlalchemy.types import Integer
from sqlalchemy.types import Enum

from utils.uuid import UuidFactory

from domains.models.user import Team
from .. import OrmBase


class ProcessStatus(enum.Enum):
    START = 1
    OUTLINE = 2
    DETAIL = 3
    MONTHLY = 4
    RANDOM_MUTATE = 9
    N_DAY = 5
    ABORT = 6
    COMPLETE = 7
    FAIL = 8


class History(OrmBase):
    __tablename__ = "scheduler_histories"
    id = Column(String(54), primary_key=True)
    _team_id = Column(String(54), ForeignKey('teams.id'))
    team = relationship("Team", uselist=False, lazy='immediate')
    month = Column(Integer)
    year = Column(Integer)
    adaptability = Column(Integer)
    process_status = Column(Enum(ProcessStatus))
    create_at = Column(DateTime, server_default=current_timestamp())

    def __init__(self, id: str, team: Team, month: int, year: int,
                 process_status: ProcessStatus, adaptability: int, **kwargs):
        self.id = id
        self.team = team
        self.month = month
        self.year = year
        self.process_status = process_status
        self.adaptability = adaptability

    @staticmethod
    def new(team: Team, month: int, year: int):
        return History(UuidFactory.new_uuid(), team, month, year, ProcessStatus.START, 0)

    def __eq__(self, other):
        if other is None or not isinstance(other, History):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
