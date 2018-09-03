# -*- coding: utf-8 -*-

from domains.models.user_repository import UserRepository
import inject


class DomainRegistry:
    def __init__(self):
        self.user_repository: UserRepository = inject.instance(UserRepository)
