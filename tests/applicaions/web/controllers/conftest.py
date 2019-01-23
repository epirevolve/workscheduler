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

    def show_myself(self, user_id):
        return self._client.get('/users/myself/{}'.format(user_id))
    
    def update_myself(self, user_id, password, name):
        return self._client.post('/users/myself/{}'.format(user_id),
                                 data=dict(id=user_id, password=password, name=name),
                                 follow_redirects=True)


@pytest.fixture
def user(client):
    return UserAction(client)


class UsersAction:
    def __init__(self, client, login_id='admin', password='padmin'):
        self._client = client
        auth(client).login(login_id, password)
    
    def show_users(self):
        return self._client.get('/users', follow_redirects=True)
    
    def append_user(self, login_id, name, affiliation_id, is_admin, is_operator):
        return self._client.post('/users', data=dict(login_id=login_id, name=name, affiliation=affiliation_id,
                                                     is_admin=is_admin, is_operator=is_operator),
                                 follow_redirects=True)
    
    def update_user(self, user_id, login_id, name, affiliation_id, is_admin, is_operator):
        return self._client.post('/users/{}'.format(user_id),
                                 data=dict(id=user_id, login_id=login_id, name=name, affiliation=affiliation_id,
                                           is_admin=is_admin, is_operator=is_operator),
                                 follow_redirects=True)
    
    def reset_password(self, user_id):
        return self._client.post('/users/{}/reset-password'.format(user_id), data=dict(id=user_id))

    def inactivate(self, user_id):
        return self._client.post('/users/{}/inactivate'.format(user_id), data=dict(id=user_id))


@pytest.fixture
def users(client):
    return UsersAction(client)
