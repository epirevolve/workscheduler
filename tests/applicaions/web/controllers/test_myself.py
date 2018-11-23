# -*- coding: utf-8 -*-


class TestMyself:
    def test_show_myself(self, client, auth, myself, random_user):
        with client:
            auth.logout()
            auth.login(random_user.login_id, random_user.password)
            rv = myself.show_myself(random_user.login_id)
            assert str.encode(random_user.login_id) in rv.data
            assert str.encode(random_user.name) in rv.data
    
    def test_store_myself(self, client, auth, myself, random_user):
        with client:
            auth.logout()
            auth.login(random_user.login_id, random_user.password)
            rv = myself.store_myself('user_pass')
            assert b'My info is successfully changed' in rv.data
            auth.logout()
            rv = auth.login(random_user.login_id, 'user_pass')
            assert b'You were logged in' in rv.data
