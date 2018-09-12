# -*- coding: utf-8 -*-

from abc import ABCMeta, abstractmethod


class UserStoreWork(metaclass=ABCMeta):
    @abstractmethod
    def store(self):
        raise NotImplementedError


class NewUserStoreWork(UserStoreWork):
    def store(self):
        pass
    

class UserManagingService:
    def __init__(self):
        self.store_method = NewUserStoreWork()
    
    def store(self,
              login_id: str, password: str,
              name: str, role: int):
        pass
    
    def store(self,
              identifier: str, login_id: str, password: str,
              name: str, role: int):
        pass
