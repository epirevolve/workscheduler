# -*- coding: utf-8 -*-


class TestUser:
    def test_show_myself(self, client, auth, user, random_user):
        with client:
            auth.logout()
            auth.login(random_user.login_id, random_user.password)
            rv = user.show_myself(random_user.login_id)
            assert str.encode(random_user.login_id) in rv.data
            assert str.encode(random_user.name) in rv.data
    
    def test_store_myself(self, client, auth, user, random_user, db_session):
        with client:
            auth.logout()
            auth.login(random_user.login_id, random_user.password)
            rv = user.store_myself(random_user.id, 'user_pass', 'user_name')
            assert b'My info is successfully changed' in rv.data
            db_session.refresh(random_user)
            assert 'user_pass' == random_user.password
            assert 'user_name' == random_user.name
            auth.logout()
            rv = auth.login(random_user.login_id, 'user_pass')
            assert b'You were logged in' in rv.data
