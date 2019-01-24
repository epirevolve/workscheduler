# -*- coding: utf-8 -*-

from workscheduler.applications.services import TeamCommand
from workscheduler.applications.services import TeamQuery
from ..forms import TeamCategoryForm


class TeamCommandAdapter(TeamCommand):
    def append_team_category(self, id: str, form: TeamCategoryForm):
        super(TeamCommandAdapter, self).append_team_category(
            id, form.name.data, form.allow_multiple_affiliation.data, form.is_leader_required.data, form.min_member_count.data, form.max_member_count.data
        )

    def update_team_category(self, teamCategoryInfo, teamInfo):
        team_category = dict(teamCategoryInfo)
        super(TeamCommandAdapter, self).update_team_category(
            team_category['id'], team_category['name'], team_category['allow_multiple_affiliation'], team_category['is_leader_required'],
            team_category['min_member_count'], team_category['max_member_count']
        )

        teams = TeamQuery(self._session).get_teams(team_category['id'])
        team_ids_db = []
        for team in teams:
            team_ids_db.append(team.id)
        team_ids_screen = []
        for team in teamInfo:
            if team[0] in team_ids_db:
                super(TeamCommandAdapter, self).update_team(
                    team[0], team[1], team[2]
                )
            else:
                super(TeamCommandAdapter, self).append_team(
                    team_category['id'], team[1], team[2]
                )
            team_ids_screen.append(team[0])
        for team_id in team_ids_db:
            if team_id not in team_ids_screen:
                super(TeamCommandAdapter, self).delete_team(
                    team_id
                )