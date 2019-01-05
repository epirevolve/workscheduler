# -*- coding: utf-8 -*-

from workscheduler.applications.services.skill_command import SkillCommand


class SkillCommandAdapter(SkillCommand):
    def append_certified_skill(self, form):
        name = form.get('skill-name')
        score_str = form.get('skill-score')
        if not name or not score_str or not score_str.isdecimal():
            raise ValueError
        score = int(score_str)
        if score < 1 or score > 10:
            raise ValueError
        return super(SkillCommandAdapter, self).append_certified_skill(name, score)

    def append_not_certified_skill(self, form):
        name = form.get('skill-name')
        score_str = form.get('skill-score')
        if not name or not score_str or not score_str.isdecimal():
            raise ValueError
        score = int(score_str)
        if score < 1 or score > 10:
            raise ValueError
        return super(SkillCommandAdapter, self).append_not_certified_skill(name, score)
