# -*- coding: utf-8 -*-

from abc import ABCMeta, abstractmethod
from domains.models.operator import Operator


class UserRepository(metaclass=ABCMeta):
    @abstractmethod
    def get_users(self) -> [Operator]:
        raise NotImplementedError

    @abstractmethod
    def append_user(self, name: str, role: int):
        raise NotImplementedError

    @abstractmethod
    def get_roles(self):
        raise NotImplementedError

    @abstractmethod
    def get_skills(self):
        raise NotImplementedError
