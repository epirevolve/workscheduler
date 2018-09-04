# -*- coding: utf-8 -*-

from domains.models.user_repository import UserRepository
from domains.models.schedule_repository import ScheduleRepository
import inject


class DomainRegistry:
    def __init__(self):
        self.user_repository: UserRepository = inject.instance(UserRepository)
        self.schedule_repository: ScheduleRepository = inject.instance(ScheduleRepository)
