# -*- coding: utf-8 -*-

from workscheduler.infrastructures.user_query import UserRepository


class TestUsers:
    def test_show_users(self, client, users):
        with client:
            rv = users.show_users()
            assert b'admin' in rv.data
            assert b'user' in rv.data
    
    def test_store_new_user(self, client, users, db_session):
        with client:
            user_repository = UserRepository(db_session)
            users_count = len(user_repository.get_users())
            rv = users.store_user('', 'new_one', '新人', '', 'on')
            assert b'If you made new user, his/her password is p + his/her login id.' in rv.data
            assert len(user_repository.get_users()) == users_count + 1
    
    def test_store_update_user(self, client, users, random_user, db_session):
        with client:
            user_repository = UserRepository(db_session)
            users_count = len(user_repository.get_users())
            rv = users.store_user(random_user.id, 'random_changed', 'some changed',
                                  'on' if not random_user.is_admin else '',
                                  'on' if not random_user.is_operator else '')
            assert b'Operator was successfully registered.' in rv.data
            assert len(user_repository.get_users()) == users_count
            user = user_repository.get_user(random_user.id)
            assert b'random_changed' in rv.data
            assert b'some changed' in rv.data
