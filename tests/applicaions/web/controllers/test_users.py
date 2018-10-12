# -*- coding: utf-8 -*-


class TestUsers:
    def test_show_users(self, client, users):
        with client:
            rv = users.show_users()
            assert b'admin' in rv.data
            assert b'user' in rv.data
    
    def test_new_user(self, client, users):
        with client:
            rv = users.store_user('', 'new_one', '新人', '', 'on')
            assert b'If you made new user, his/her password is p + his/her login id.' in rv.data
