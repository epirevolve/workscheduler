# -*- coding: utf-8 -*-


def login(client, login_id, password):
    return client.post('/login', data=dict(login_id=login_id, password=password), follow_redirects=True)


def test_login(client):
    with client:
        # login success test
        rv = login(client, 'admin', 'minAd')
        assert b'Work Scheduler' in rv.data
        # login error test
        rv = login(client, 'none', 'none')
        assert b'Invalid username or password' in rv.data
