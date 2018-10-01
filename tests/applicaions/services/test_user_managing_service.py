# -*- coding: utf-8 -*-


class TestUserManagingService:
    def test_store_new_user(self, user_managing_service, user_repository):
        roles = user_repository.get_roles()
        operator_role = roles[1]
        count = len(user_repository.get_users())
        user_managing_service.store('test1identifier', 'test1', 'test1pass', 'テスト１', operator_role.id)
        assert count + 1 == len(user_repository.get_users())
        user_managing_service.store('test2', 'test2pass', 'テスト２', operator_role.id)
        assert count + 2 == len(user_repository.get_users())
        
    def test_store_update_user(self, user_managing_service, user_repository):
        users = user_repository.get_users()
        count = len(users)
        user = users[0]
        user_managing_service.store(user.id, user.login_id + '-u', user.password + '-u',
                                    user.name + '-u', user.role_id)
        assert count == len(user_repository.get_users())
