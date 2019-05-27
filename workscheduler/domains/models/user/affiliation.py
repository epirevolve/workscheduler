# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.orm import validates
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import String
from sqlalchemy.types import DateTime

from mypackages.utils.uuid import UuidFactory

from .. import OrmBase


class Affiliation(OrmBase):
    __tablename__ = 'affiliations'
    id = Column(String, primary_key=True)
    name = Column(String(20), nullable=False)
    note = Column(String(50))
    create_at = Column(DateTime, server_default=current_timestamp())
    
    _default_name = "未所属"
    
    def __init__(self, id: str, name: str, note: str, **kwargs):
        self.id = id
        self.name = name
        self.note = note

    @validates('id', 'name')
    def validate(self, key, value):
        return super(Affiliation, self).validate(Affiliation, key, value)
    
    @property
    def is_default(self):
        return self.name == Affiliation._default_name
    
    @staticmethod
    def new(name: str, note: str):
        return Affiliation(UuidFactory.new_uuid(), name, note)
    
    @staticmethod
    def default():
        return Affiliation.new(
            Affiliation._default_name, '新規ユーザはこの所属となります。\r\nオペレータ画面にて所属を変更してください。')
    
    def __eq__(self, other):
        if other is None or not isinstance(other, Affiliation):
            return False
        return self.id == other.id
    
    def __hash__(self):
        return hash(self.id)
