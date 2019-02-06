# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms import BooleanField
from wtforms import HiddenField

from workscheduler.applications.services import SkillQuery
from workscheduler.applications.web import get_db_session


class SkillForm(FlaskForm):
    id = HiddenField()
    name = StringField()
    is_obtain = BooleanField()
    
    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        super(SkillForm, self).__init__(*args, **kwargs)


class OperatorsForm(FlaskForm):
    id = HiddenField()
    all_certified_skills = []
    all_not_certified_skills = []
    
    def __init__(self, *args, **kwargs):
        skill_query = SkillQuery(get_db_session())
        all_certified_skills = skill_query.get_certified_skills()
        all_not_certified_skills = skill_query.get_not_certified_skills()
        
        self.all_certified_skills.clear()
        self.all_not_certified_skills.clear()

        if 'obj' in kwargs:
            obj = kwargs.get('obj', [])
            certified_skill_ids = [x.id for x in obj.certified_skills]
            not_certified_skill_ids = [x.id for x in obj.not_certified_skills]
            
            for certified_skill in all_certified_skills:
                if certified_skill.id in certified_skill_ids:
                    setattr(certified_skill, 'is_obtain', True)
            
            for not_certified_skill in all_not_certified_skills:
                if not_certified_skill.id in not_certified_skill_ids:
                    setattr(not_certified_skill, 'is_obtain', True)
        
        for skill in all_certified_skills:
            self.all_certified_skills.append(
                SkillForm(obj=skill, prefix='skill-{}'.format(skill.name)))
        for skill in all_not_certified_skills:
            self.all_not_certified_skills.append(
                SkillForm(obj=skill, prefix='skill-{}'.format(skill.name)))

        kwargs['all_certified_skills'] = all_certified_skills
        kwargs['all_not_certified_skills'] = all_not_certified_skills
        
        super(OperatorsForm, self).__init__(*args, **kwargs)
