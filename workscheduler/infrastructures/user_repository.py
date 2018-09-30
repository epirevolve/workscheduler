# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import User
from workscheduler.domains.models.role import Role
from workscheduler.domains.models.relation import Relation


class UserRepository:
    def __init__(self, session):
        self._session = session
    
    def get_user(self, id: str) -> (User, Role):
        return self._session.query(User, Role).join(Role, User.role_id == Role.id)\
            .filter(User.id == id).one_or_none()

    def get_users(self) -> [(User, Role)]:
        return self._session.query(User, Role).join(Role, User.role_id == Role.id)\
            .order_by(User.id).all()
    
    def store_user(self, user: User):
        self._session.merge(user)
    
    def get_role(self, id: str) -> Role:
        return self._session.query(Role).get(id)

    def get_roles(self) -> [Role]:
        return self._session.query(Role).order_by(Role.id).all()
    
    def store_role(self, role: Role):
        self._session.merge(role)
    
    def get_skills(self):
        raise NotImplementedError
    
    def get_relations(self):
        return self._session.query(Relation).order_by(Relation.user_1, Relation.user_2).all()
    
    def append_relation(self, relation: Relation):
        self._session.merge(relation)
