# -*- coding: utf-8 -*-

from domains.models.user_repository import UserRepository
import inject


class DomainRegister:
    def __init__(self):
        self.user_repository: UserRepository = inject.instance(UserRepository)
        self.test = ''
