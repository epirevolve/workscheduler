# -*- coding: utf-8 -*-
from builtins import setattr

from flask_wtf import FlaskForm
from wtforms import (
    StringField, PasswordField, BooleanField,
    FormField, HiddenField
)
from wtforms.validators import (
    DataRequired, Length
)
from workscheduler.domains.models.user import User
from workscheduler.applications.services import UserQuery
from .. import get_db_session


class SkillForm(FlaskForm):
    id = HiddenField()
    name = StringField()
    is_obtain = BooleanField()

    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        super(SkillForm, self).__init__(*args, **kwargs)
        

class AllSkillsForm(FlaskForm):
    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        super(AllSkillsForm, self).__init__(*args, **kwargs)


class MyselfForm(FlaskForm):
    id = HiddenField()
    login_id = StringField()
    password = PasswordField(validators=[DataRequired(), Length(max=User.password.type.length)])
    name = StringField(validators=[DataRequired(), Length(max=User.name.type.length)])
    is_operator = BooleanField()
    # all_skills = FormField(AllSkillsForm)
    all_skills = []
    
    def __new__(cls, *args, **kwargs):
        # session = get_db_session()
        # user_repository = UserQuery(session)
        # user_repository.get_skills()
        # for skill in user_repository.get_skills():
        #     # setattr(AllSkillsForm, skill.name, SkillForm())
        #     cls.all_skills.append(SkillForm())
        return super(MyselfForm, cls).__new__(cls)
    
    def __init__(self, *args, **kwargs):
        session = get_db_session()
        user_repository = UserQuery(session)
        user_repository.get_skills()

        def append(x):
            self.all_skills.append(SkillForm(obj=x, prefix='skill-{}'.format(x.name)))
        self.all_skills.clear()
        if 'obj' in kwargs:
            obj = kwargs['obj']
            skill_ids = list(map(lambda y: y.id, obj.skills))
            
            def append(x):
                if x.id in skill_ids:
                    setattr(x, 'is_obtain', True)
                self.all_skills.append(SkillForm(obj=x, prefix='skill-{}'.format(x.name)))
        append = append
        for skill in user_repository.get_skills():
            # setattr(AllSkillsForm, skill.name, SkillForm())
            append(skill)
        
        super(MyselfForm, self).__init__(*args, **kwargs)
