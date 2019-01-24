# -*- coding: utf-8 -*-

from . import TeamQuery, UserQuery
from workscheduler.domains.models.operator import (
    Team, TeamCategory
)


class TeamCommand:
    def __init__(self, session):
        self._session = session

    def append_team_category(self, id: str, name: str, allow_multiple_affiliation: bool, is_leader_required: bool, min_member_count: int, max_member_count: int):
        team_category = TeamCategory.register_a_team_category(id, name, allow_multiple_affiliation, is_leader_required, min_member_count, max_member_count)
        self._session.add(team_category)

    def update_team_category(self, id: str, name: str, allow_multiple_affiliation: bool, is_leader_required: bool, min_member_count: int, max_member_count: int):
        team_category = TeamQuery(self._session).get_team_category(id)
        team_category.name = name
        team_category.allow_multiple_affiliation = allow_multiple_affiliation
        team_category.is_leader_required = is_leader_required
        team_category.min_member_count = min_member_count
        team_category.max_member_count = max_member_count

    def update_team(self, id: str, name: str, all_member_info):
        team = TeamQuery(self._session).get_team(id)
        team.name = name
        team.users.clear()
        for member_info in all_member_info:
            if member_info[1]:
                team.leader_user_id = member_info[0]
            team.users.append(UserQuery(self._session).get_user(member_info[0]))
        self._session.add(team)

    def append_team(self, team_category_id: str, name: str, all_member_info):
        team = Team.new_team(name, team_category_id)
        for member_info in all_member_info:
            if member_info[1]:
                team.leader_user_id = member_info[0]
            team.users.append(UserQuery(self._session).get_user(member_info[0]))
        self._session.add(team)

    def delete_team(self, id: str):
        self._session.delete(TeamQuery(self._session).get_team(id))
