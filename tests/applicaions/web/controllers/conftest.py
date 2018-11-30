# -*- coding: utf-8 -*-

import pytest


class AuthAction:
    def __init__(self, client):
        self._client = client
    
    def index(self):
        return self._client.get('/')

    def login(self, login_id, password):
        return self._client.post('/login', data=dict(login_id=login_id, password=password), follow_redirects=True)
    
    def logout(self):
        return self._client.get('/logout', follow_redirects=True)


@pytest.fixture
def auth(client):
    return AuthAction(client)


class MyselfAction:
    def __init__(self, client, login_id='admin', passwod='padmin'):
        self._client = client
        auth(client).login(login_id, passwod)

    def show_myself(self, login_id):
        return self._client.get('/myself/' + login_id)
    
    def store_myself(self, id, password,
                     name, all_skills):
        return self._client.post('/store_myself', data=dict(id=id, password=password, name=name,
                                                            all_skills=all_skills),
                                 follow_redirects=True)


@pytest.fixture
def myself(client):
    return MyselfAction(client)


class UsersAction:
    def __init__(self, client, login_id='admin', password='padmin'):
        self._client = client
        auth(client).login(login_id, password)
    
    def show_users(self):
        return self._client.get('/users', follow_redirects=True)
        
    def store_user(self, id, login_id, name, is_admin, is_operator):
        return self._client.post('/store_user', data=dict(id=id, login_id=login_id, name=name,
                                                          is_admin=is_admin, is_operator=is_operator),
                                 follow_redirects=True)
    
    def reset_password(self, id):
        return self._client.post('/reset_password', data=dict(id=id))


@pytest.fixture
def users(client):
    return UsersAction(client)
