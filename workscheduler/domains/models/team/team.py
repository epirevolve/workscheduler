# -*- coding: utf-8 -*-

from sqlalchemy import (
    Column, Table, ForeignKey
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import (
    String, DateTime
)

from mypackages.utils.uuid import UuidFactory
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
    team_category_id = Column(String, ForeignKey('team_categories.id'))
    create_at = Column(DateTime, server_default=current_timestamp())

    users = relationship("User", secondary=team_users_table, backref="teams")

    def __init__(self, id_: str, team_category_id: str, name: str):
        self.id = id_
        self.team_category_id = team_category_id
        self.name = name

    @staticmethod
    def new_team(team_category_id: str, name: str):
        return Team(UuidFactory.new_uuid(), team_category_id, name)
