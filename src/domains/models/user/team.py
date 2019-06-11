# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.orm import validates
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import String
from sqlalchemy.types import DateTime
from sqlalchemy.types import Boolean

from utils.uuid import UuidFactory

from .. import OrmBase


class Team(OrmBase):
    __tablename__ = 'teams'
    id = Column(String, primary_key=True)
    name = Column(String(20), nullable=False)
    is_main = Column(Boolean)
    is_require_leader = Column(Boolean)
    note = Column(String(50))
    create_at = Column(DateTime, server_default=current_timestamp())
    
    _default_name = "未所属"
    
    def __init__(self, id: str, name: str, note: str,
                 is_main: bool = False, is_require_leader: bool = False, **kwargs):
        self.id = id
        self.name = name
        self.is_main = is_main
        self.is_require_leader = is_require_leader
        self.note = note

    @validates('id', 'name')
    def validate(self, key, value):
        return super(Team, self).validate(Team, key, value)
    
    @property
    def is_default(self):
        return self.name == Team._default_name
    
    @staticmethod
    def new(name: str, note: str):
        return Team(UuidFactory.new_uuid(), name, note)
    
    @staticmethod
    def default():
        return Team.new(
            Team._default_name, '新規ユーザはこの所属となります。\r\nオペレータ画面にて所属を変更してください。')
    
    def __eq__(self, other):
        if other is None or not isinstance(other, Team):
            return False
        return self.id == other.id
    
    def __hash__(self):
        return hash(self.id)
