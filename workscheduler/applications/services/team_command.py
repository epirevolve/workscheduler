# -*- coding: utf-8 -*-

from workscheduler.domains.models.team import TeamCategory


class TeamCommand:
    def __init__(self, session):
        self._session = session

    def append_team_category(self, name: str, allow_multiple_affiliation: bool,
                             is_leader_required: bool, min_member_count: int, max_member_count: int):
        team_category = TeamCategory.new_team_category(
            name, allow_multiple_affiliation, is_leader_required,
            min_member_count, max_member_count)
        self._session.add(team_category)
