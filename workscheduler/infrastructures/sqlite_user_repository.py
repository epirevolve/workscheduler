# -*- coding: utf-8 -*-

from domains.models.operator import Operator
from domains.models.user import User
from domains.models.user_repository import UserRepository
from infrastructures.sqlite_connection import SqliteConnection


class SqliteUserRepository(UserRepository):
    def __init__(self, connect_string):
        with SqliteConnection(connect_string).get_db() as con:
            cur = con.execute('select id, login_id, password, name, role from users order by id desc')
            users = cur.fetchall()
            self.users: {int: User} = {x['id']: User(x['id'], x['login_id'], x['password'], x['name'], x['role'])
                                       for x in users}

            cur = con.execute('select name from roles order by id desc')
            self.ranks = cur.fetchall()

            cur = con.execute('select name, score from skills order by id desc')
            self.skills = cur.fetchall()
    
    def get_users(self) -> [User]:
        return [x for i, x in self.users.items()]
    
    def get_operators(self) -> [Operator]:
        return [x for i, x in self.users.items()]

    def append_user(self, name: str, role: int):
        operator = Operator(max(self.users.keys()) + 1, name, role)
        self.users[operator.id] = operator

    def get_roles(self):
        return self.ranks

    def get_skills(self):
        return self.skills
