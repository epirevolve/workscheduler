# -*- coding: utf-8 -*-

from workscheduler.applications.services import TeamCommand
from ..forms import TeamCategoryForm
from .utils import validate_form


class TeamCommandAdapter(TeamCommand):
    def append_team_category(self, form: TeamCategoryForm):
        super(TeamCommandAdapter, self).append_team_category(
            form.name.data, form.allow_multiple_affiliationing.data, form.is_leader_required.data, form.min_member_count.data, form.max_member_count.data
        )
