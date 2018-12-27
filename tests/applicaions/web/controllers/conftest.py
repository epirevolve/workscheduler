# -*- coding: utf-8 -*-

import pytest


class AuthAction:
    def __init__(self, client):
        self._client = client
    
    def index(self):
        return self._client.get('/')

    def login(self, login_id, password):
        return self._client.post('/auth/login', data=dict(login_id=login_id, password=password), follow_redirects=True)
    
    def logout(self):
        return self._client.get('/auth/logout', follow_redirects=True)


@pytest.fixture
def auth(client):
    return AuthAction(client)


class UserAction:
    def __init__(self, client, login_id='admin', passwod='padmin'):
        self._client = client
        auth(client).login(login_id, passwod)

    def show_myself(self, login_id):
        return self._client.get('/users/show_myself/' + login_id)
    
    def update_myself(self, id, password, name):
        return self._client.post('/users/update_myself', data=dict(id=id, password=password, name=name),
                                 follow_redirects=True)


@pytest.fixture
def user(client):
    return UserAction(client)


class UsersAction:
    def __init__(self, client, login_id='admin', password='padmin'):
        self._client = client
        auth(client).login(login_id, password)
    
    def show_users(self):
        return self._client.get('/users/show_users', follow_redirects=True)
    
    def append_user(self, login_id, name, belong_id, is_admin, is_operator):
        return self._client.post('/users/append_user', data=dict(login_id=login_id, name=name, belong=belong_id,
                                                                 is_admin=is_admin, is_operator=is_operator),
                                 follow_redirects=True)
    
    def update_user(self, id, login_id, name, belong_id, is_admin, is_operator):
        return self._client.post('/users/update_user', data=dict(id=id, login_id=login_id, name=name, belong=belong_id,
                                                                 is_admin=is_admin, is_operator=is_operator),
                                 follow_redirects=True)
    
    def reset_password(self, id):
        return self._client.post('/users/reset_password', data=dict(id=id))

    def inactivate(self, id):
        return self._client.post('/users/inactivate', data=dict(id=id))


@pytest.fixture
def users(client):
    return UsersAction(client)
