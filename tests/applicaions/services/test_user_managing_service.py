# -*- coding: utf-8 -*-

from workscheduler.applications.services import UserQuery


class TestUserManageCommand:
    def test_store_new_user(self, user_manage_command, session):
        user_repository = UserQuery(session)
        count = len(user_repository.get_users())
        user_manage_command.store_user(
            '', 'test1', 'テスト１',
            True, False
        )
        session.commit()
        assert count + 1 == len(user_repository.get_users())
        user = user_repository.get_users()[-1]
        assert user.id
        assert 'test1' == user.login_id
        assert 'テスト１' == user.name
        assert user.is_admin
        assert not user.is_operator
        
    def test_store_update_user(self, user_manage_command, session):
        user_repository = UserQuery(session)
        users = user_repository.get_users()
        count = len(users)
        user = users[0]
        user_manage_command.store_user(
            user.id, 'random login id', 'random name',
            False, True)
        session.commit()
        assert count == len(user_repository.get_users())
        session.refresh(user)
        assert user.id
        assert 'random login id' == user.login_id
        assert 'random name' == user.name
        assert not user.is_admin
        assert user.is_operator
    
    def test_reset_password(self, user_manage_command, session):
        user_repository = UserQuery(session)
        users = user_repository.get_users()
        count = len(users)
        user = users[0]
        user_manage_command.reset_password(user.id)
        session.commit()
        assert count == len(user_repository.get_users())
        session.refresh(user)
        assert 'p' + user.login_id == user.password
