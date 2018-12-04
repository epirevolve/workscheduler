# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import (
    StringField, BooleanField, HiddenField
)
from workscheduler.applications.services import OperatorQuery
from .. import get_db_session


class SkillForm(FlaskForm):
    id = HiddenField()
    name = StringField()
    is_obtain = BooleanField()
    
    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        super(SkillForm, self).__init__(*args, **kwargs)


class OperatorForm(FlaskForm):
    id = HiddenField()
    all_skills = []

    def __init__(self, *args, **kwargs):
        session = get_db_session()
        operator_query = OperatorQuery(session)
        operator_query.get_skills()
    
        def append(x):
            self.all_skills.append(SkillForm(obj=x, prefix='skill-{}'.format(x.name)))
    
        self.all_skills.clear()
        if 'obj' in kwargs:
            obj = kwargs['obj']
            skill_ids = [x.id for x in obj.skills]
        
            def append(x):
                if x.id in skill_ids:
                    setattr(x, 'is_obtain', True)
                self.all_skills.append(SkillForm(obj=x, prefix='skill-{}'.format(x.name)))
        append = append
        for skill in operator_query.get_skills():
            append(skill)
    
        super(OperatorForm, self).__init__(*args, **kwargs)
