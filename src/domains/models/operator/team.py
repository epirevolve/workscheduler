# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import String
from sqlalchemy.types import DateTime

from utils.uuid import UuidFactory
from .. import OrmBase

team_users_table\
    = Table("team_users", OrmBase.metadata,
            Column('team_id', String, ForeignKey('teams.id')),
            Column('user_id', String, ForeignKey('users.id'))
            )


class Team(OrmBase):
    __tablename__ = 'teams'
    id = Column(String, primary_key=True)
    name = Column(String(50))
    leader_user_id = Column(String, ForeignKey('users.id'))
    team_category_id = Column(String, ForeignKey('team_categories.id'))
    create_at = Column(DateTime, server_default=current_timestamp())

    users = relationship("User", secondary=team_users_table, backref="teams")

    def __init__(self, id: str, name: str, team_category_id: str):
        self.id = id
        self.name = name
        self.team_category_id = team_category_id

    @classmethod
    def new_team(cls, name: str, team_category_id: str):
        return Team(UuidFactory.new_uuid(), name, team_category_id)
