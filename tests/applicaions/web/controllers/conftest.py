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
