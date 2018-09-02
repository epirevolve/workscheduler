# -*- coding: utf-8 -*-

from domains.models.operator import Operator
from domains.models.user_repository import UserRepository
from infrastructures.sqlite_connection import SqliteConnection


class SqliteUserRepository(UserRepository):
    def __init__(self, connect_string):
        with SqliteConnection(connect_string).get_db() as con:
            cur = con.execute('select id, name, password, role from users order by id desc')
            users = cur.fetchall()
            self.users: {int: Operator} = {x["id"]: Operator(x["id"], x["name"], x["role"]) for x in users}

            cur = con.execute('select name from roles order by id desc')
            self.ranks = cur.fetchall()

            cur = con.execute('select name, score from skills order by id desc')
            self.skills = cur.fetchall()

    def get_users(self) -> [Operator]:
        return [x for i, x in self.users]

    def append_user(self, name: str, role: int):
        operator = Operator(max(self.users.keys()) + 1, name, role)
        self.users[operator.id] = operator

    def get_roles(self):
        return self.ranks

    def get_skills(self):
        return self.skills
