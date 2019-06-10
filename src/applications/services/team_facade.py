# -*- coding: utf-8 -*-

from . import TeamCommand
from . import SchedulerCommand


class TeamFacade:
    def __init__(self, session):
        self._session = session
    
    def append_team(self, name: str, note: str):
        team = TeamCommand(self._session).append_team(name, note)
        self._session.flush()
        SchedulerCommand(self._session).append_scheduler(team.id)
        return team
