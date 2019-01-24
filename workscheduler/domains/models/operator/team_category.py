# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import (
    String, Boolean, Integer,
    DateTime
)

from mypackages.utils.uuid import UuidFactory
from workscheduler.domains.models import OrmBase


class TeamCategory(OrmBase):
    __tablename__ = 'team_categories'
    id = Column(String, primary_key=True)
    name = Column(String(50))
    allow_multiple_affiliation = Column(Boolean)
    is_leader_required = Column(Boolean)
    min_member_count = Column(Integer)
    max_member_count = Column(Integer)
    create_at = Column(DateTime, server_default=current_timestamp())
    teams = relationship("Team", backref="team_categories")

    def __init__(self, id_: str, name: str, allow_multiple_affiliation: bool,
                 is_leader_required: bool, min_member_count: int, max_member_count: int):
        self.id = id_
        self.name = name
        self.allow_multiple_affiliation = allow_multiple_affiliation
        self.is_leader_required = is_leader_required
        self.min_member_count = min_member_count
        self.max_member_count = max_member_count

    @classmethod
    def register_a_team_category(cls, id_: str, name: str, allow_multiple_affiliation: bool,
                                 is_leader_required: bool, min_member_count: int, max_member_count: int):
        return TeamCategory(id_, name, allow_multiple_affiliation,
                            is_leader_required, min_member_count, max_member_count)

    @staticmethod
    def new_team_category(name: str, allow_multiple_affiliation: bool,
                          is_leader_required: bool, min_member_count: int, max_member_count: int):
        return TeamCategory(UuidFactory.new_uuid(), name, allow_multiple_affiliation,
                            is_leader_required, min_member_count, max_member_count)
