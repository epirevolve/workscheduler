# -*- coding: utf-8 -*-

from datetime import datetime

from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy.orm import validates
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import String
from sqlalchemy.types import DateTime

from utils.uuid import UuidFactory

from .. import OrmBase
from ..operator import Operator


class Request(OrmBase):
    __tablename__ = 'requests'
    id = Column(String, primary_key=True)
    title = Column(String(30), nullable=False)
    note = Column(String(100))
    at_from = Column(DateTime, nullable=False)
    at_to = Column(DateTime, nullable=False)
    _operator_id = Column(String, ForeignKey('operators.id'))
    operator = relationship("Operator", uselist=False, lazy='subquery')
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id: str, title: str, note: str,
                 at_from: datetime, at_to: datetime, operator: Operator, **kwargs):
        self.id = id
        self.title = title
        self.note = note
        self.at_from = at_from
        self.at_to = at_to
        self.operator = operator
    
    @validates('id', 'title', 'at_from', 'at_to')
    def validate(self, key, value):
        return super(Request, self).validate(Request, key, value)

    @staticmethod
    def new(name: str, note: str, at_from: datetime,
            at_to: datetime, operator: Operator):
        return Request(UuidFactory.new_uuid(), name, note,
                       at_from, at_to, operator)
    
    def __eq__(self, other):
        if other is None or not isinstance(other, Request):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
