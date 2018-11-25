# -*- coding: utf-8 -*-


class TestAuth:
    def test_index(self, client, auth):
        with client:
            rv = auth.index()
            assert b'Login' in rv.data
        
    def test_login(self, client, auth):
        with client:
            # login success test
            rv = auth.login('admin', 'padmin')
            assert b'You were logged in' in rv.data
            # login error test
            rv = auth.login('none', 'none')
            assert b'Invalid username or password' in rv.data
        
    def test_logout(self, client, auth):
        with client:
            rv = auth.logout()
            assert b'You were logged out' in rv.data
            auth.login('admin', 'minAd')
            rv = auth.logout()
            assert b'You were logged out' in rv.data
