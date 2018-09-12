# -*- coding: utf-8 -*-

from domains.models.operator import Operator
from domains.models.user import User
from domains.models.role import Role
from domains.models.relation import Relation


class UserRepository:
    def __init__(self, session):
        self._session = session
    
    def get_user(self, identifier: str) -> User:
        return self._session.query(User, Role).join(Role, User.role_identifier == Role.identifier)\
            .filter(User.identifier == identifier).one()

    def get_users(self) -> [User]:
        return self._session.query(User, Role).join(Role, User.role_identifier == Role.identifier)\
            .order_by(User.identifier).all()
    
    def store_user(self, user: User):
        self._session.add(user)
    
    def get_role(self, identifier: str) -> Role:
        return self._session.query(Role).get(identifier)

    def get_roles(self) -> [Role]:
        return self._session.query(Role).order_by(Role.identifier).all()
    
    def store_role(self, role: Role):
        self._session.add(role)
    
    def get_skills(self):
        raise NotImplementedError
    
    def get_relations(self):
        relations = self._fetch_all('select identifier, user_1, user_2, affinity, looked_by '
                                    'from user_relations order by user_1, user_2 asc')
        return [Relation(x['identifier'], x['user_1'], x['user_2'], x['affinity'], x['looked_by']) for x in relations]
    
    def append_relation(self, user_1: int, user_2: int, affinity: float, looked_by: int):
        self._execute('insert into user_relations (user_1, user_2, affinity, looked_by) values (?, ?, ?, ?)',
                      user_1, user_2, affinity, looked_by, commit=True)
