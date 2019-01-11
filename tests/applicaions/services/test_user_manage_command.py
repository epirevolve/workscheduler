# -*- coding: utf-8 -*-

from workscheduler.applications.services import UserQuery
from workscheduler.domains.models.user import Belong


class TestUserManageCommand:
    def test_append_user(self, user_manage_command, session):
        user_repository = UserQuery(session)
        belong = Belong.new_belong('test', 'this is test')
        session.add(belong)
        session.commit()
        count = len(user_repository.get_users())
        user_manage_command.append_user(
            'test1', 'テスト１', belong.id,
            True, False
        )
        session.commit()
        assert count + 1 == len(user_repository.get_users())
        user = user_repository.get_users()[-1]
        assert user.id
        assert 'test1' == user.login_id
        assert 'テスト１' == user.name
        assert 'test' == user.belong.name
        assert user.is_admin
        assert not user.is_operator
        
    def test_update_user(self, user_manage_command, session):
        user_repository = UserQuery(session)
        users = user_repository.get_users()
        belong = Belong.new_belong('new test', 'this is changed')
        session.add(belong)
        session.commit()
        count = len(users)
        user = users[0]
        user_manage_command.update_user(
            user.id, 'random login id', 'random name', belong.id,
            False, True)
        session.commit()
        assert count == len(user_repository.get_users())
        session.refresh(user)
        assert user.id
        assert 'random login id' == user.login_id
        assert 'random name' == user.name
        assert 'new test' == user.belong.name
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

    def test_inactivate(self, user_manage_command, session):
        user_repository = UserQuery(session)
        users = user_repository.get_users()
        count = len(users)
        user = users[0]
        assert not user.is_inactivated
        user_manage_command.inactivate(user.id)
        session.commit()
        assert count == len(user_repository.get_users())
        session.refresh(user)
        assert user.is_inactivated
