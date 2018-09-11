# -*- coding: utf-8 -*-

from domains.models.operator import Operator
from domains.models.user import User
from domains.models.role import Role
from domains.models.relation import Relation
from domains.models.user_repository import UserRepository
from infrastructures.sqlite_repository import SqliteRepository


class SqliteUserRepository(SqliteRepository, UserRepository):
    def __init__(self, connect_string: str):
        super().__init__(connect_string)
    
    def get_user(self, identify: int) -> User:
        user = self._fetch_one('select id, login_id, password, name, role from users where id == ? order by id asc',
                               identify)
        if not user:
            return None
        role = self.get_role(user["role"])
        return User(user["id"], user['login_id'], user['password'], user['name'], role)
    
    def get_users(self) -> [User]:
        users = self._fetch_all('select id, login_id, password, name, role from users order by id asc')
        roles = self.get_roles()
        
        def find_role(role_uuid):
            return next(filter(lambda x: x.uuid == role_uuid, roles), None)
        return [User(x['id'], x['login_id'], x['password'], x['name'], find_role(x['role'])) for x in users]
    
    def append_user(self, login_id: str, password: str, name: str, role: int):
        self._execute('insert into users (login_id, password, name, role) values (?, ?, ?, ?)',
                      login_id, password, name, role, commit=True)
    
    def get_operators(self) -> [Operator]:
        raise NotImplementedError

    def get_role(self, identity: int) -> Role:
        role = self._fetch_one('select uuid, name, is_admin from roles where uuid == ? order by uuid asc',
                               identity)
        return Role(role['uuid'], role['name'], role['is_admin']) if role else None

    def get_roles(self) -> [Role]:
        roles = self._fetch_all('select uuid, name, is_admin from roles order by uuid asc')
        return [Role(x['uuid'], x['name'], x['is_admin']) for x in roles]
    
    def store_role(self, role: Role):
        self._execute('replace into roles (uuid, name, is_admin) values (?, ?, ?)',
                      role.uuid, role.name, role.is_admin, commit=True)
    
    def get_skills(self):
        raise NotImplementedError
    
    def get_relations(self):
        relations = self._fetch_all('select id, user_1, user_2, affinity, looked_by '
                                    'from user_relations order by user_1, user_2 asc')
        return [Relation(x['id'], x['user_1'], x['user_2'], x['affinity'], x['looked_by']) for x in relations]
    
    def append_relation(self, user_1: int, user_2: int, affinity: float, looked_by: int):
        self._execute('insert into user_relations (user_1, user_2, affinity, looked_by) values (?, ?, ?, ?)',
                      user_1, user_2, affinity, looked_by, commit=True)
