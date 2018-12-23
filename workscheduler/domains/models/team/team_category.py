# -*- coding: utf-8 -*-

from workscheduler.domains.utils.uuid import UuidFactory
from workscheduler.domains.models import OrmBase
from sqlalchemy import Column
from sqlalchemy.orm import relationship
from sqlalchemy.types import String, Boolean, Integer, DateTime
from sqlalchemy.sql.functions import current_timestamp


class TeamCategory(OrmBase):
    __tablename__ = 'team_categories'
    id = Column(String, primary_key=True)
    name = Column(String(50))
    allow_multiple_belonging = Column(Boolean)
    is_leader_required = Column(Boolean)
    min_member_count = Column(Integer)
    max_member_count = Column(Integer)
    create_at = Column(DateTime, server_default=current_timestamp())

    teams = relationship("Team", backref="team_categories")

    def __init__(self, id: str, name: str, allow_multiple_belonging: bool, is_leader_required: bool, min_member_count: int, max_member_count: int):
        self.id = id
        self.name = name
        self.allow_multiple_belonging = allow_multiple_belonging
        self.is_leader_required = is_leader_required
        self.min_member_count = min_member_count
        self.max_member_count = max_member_count

class TeamCategoryFactory:
    @classmethod
    def register_a_test_team_category(cls, id: str, name: str, allow_multiple_belonging: bool, is_leader_required: bool, min_member_count: int, max_member_count: int):
        return TeamCategory(id, name, allow_multiple_belonging, is_leader_required, min_member_count, max_member_count)

    @classmethod
    def register_a_team_category(cls, name: str, allow_multiple_belonging: bool, is_leader_required: bool, min_member_count: int, max_member_count: int):
        return TeamCategory(UuidFactory.new_uuid(), name, allow_multiple_belonging, is_leader_required, min_member_count, max_member_count)
