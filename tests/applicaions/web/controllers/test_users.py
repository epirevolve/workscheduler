# -*- coding: utf-8 -*-

from workscheduler.applications.services.user_query import UserQuery


class TestUsers:
    def test_show_users(self, client, users):
        with client:
            rv = users.show_users()
            assert b'admin' in rv.data
            assert b'user' in rv.data
    
    def test_store_new_user(self, client, users, db_session):
        with client:
            user_repository = UserQuery(db_session)
            users_count = len(user_repository.get_users())
            rv = users.store_user('', 'new_one', '新人', '', 'on')
            assert b'If you made new user, his/her password is p + his/her login id.' in rv.data
            users = user_repository.get_users()
            assert len(users) == users_count + 1
            assert 'new_one' == users[-1].login_id
            assert '新人' == users[-1].name
            assert not users[-1].is_admin
            assert users[-1].is_operator
    
    def test_store_update_user(self, client, users, random_user, db_session):
        with client:
            user_repository = UserQuery(db_session)
            users_count = len(user_repository.get_users())
            rv = users.store_user(random_user.id, 'random_changed', 'some changed',
                                  'on' if not random_user.is_admin else '',
                                  'on' if not random_user.is_operator else '')
            assert b'User was successfully registered.' in rv.data
            assert len(user_repository.get_users()) == users_count
            db_session.refresh(random_user)
            assert 'random_changed' == random_user.login_id
            assert 'some changed' == random_user.name
            assert b'random_changed' in rv.data
            assert b'some changed' in rv.data
    
    def test_reset_password(self, client, users, random_user, db_session):
        with client:
            user_repository = UserQuery(db_session)
            users_count = len(user_repository.get_users())
            assert not 'p' + random_user.login_id == random_user.password
            rv = users.reset_password(random_user.id)
            assert 200 == rv.status_code
            db_session.refresh(random_user)
            assert len(user_repository.get_users()) == users_count
            assert 'p' + random_user.login_id == random_user.password
            
    def test_reset_password_fail(self, client, users):
        with client:
            rv = users.reset_password('')
            assert 400 == rv.status_code
            rv = users.reset_password('test')
            assert 400 == rv.status_code
