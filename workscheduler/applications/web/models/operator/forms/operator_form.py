# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms import BooleanField
from wtforms import HiddenField
from wtforms import IntegerField

from workscheduler.applications.services import SkillQuery
from workscheduler.applications.web import get_db_session


class SkillForm(FlaskForm):
    id = HiddenField()
    name = StringField()
    is_obtain = BooleanField()
    
    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        super(SkillForm, self).__init__(*args, **kwargs)


class OperatorForm(FlaskForm):
    id = HiddenField()
    all_certified_skills = []
    remain_paid_holiday = IntegerField()

    def __init__(self, *args, **kwargs):
        certified_skills = SkillQuery(get_db_session()).get_certified_skills()

        self.all_certified_skills.clear()

        if 'obj' in kwargs:
            obj = kwargs.get('obj')
            certified_skill_ids = [x.id for x in obj.certified_skills]
            
            for skill in certified_skills:
                if skill.id in certified_skill_ids:
                    setattr(skill, 'is_obtain', True)
        
        for skill in certified_skills:
            self.all_certified_skills.append(
                SkillForm(obj=skill, prefix='skill-{}'.format(skill.id))
            )
    
        super(OperatorForm, self).__init__(*args, **kwargs)
