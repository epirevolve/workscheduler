# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import (
    StringField, PasswordField, BooleanField,
    FormField
)
from wtforms.validators import (
    DataRequired, Length
)
from workscheduler.domains.models.user import User
from workscheduler.applications.services import UserQuery
from .. import get_db_session


class AllSkillsForm(FlaskForm):
    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        super(AllSkillsForm, self).__init__(*args, **kwargs)


class MyselfForm(FlaskForm):
    login_id = StringField(validators=[DataRequired(), Length(User.login_id.type.length)])
    password = PasswordField(validators=[DataRequired(), Length(User.password.type.length)])
    name = StringField(validators=[DataRequired(), Length(User.name.type.length)])
    is_operator = BooleanField()
    all_skills = FormField(AllSkillsForm)
    
    def __new__(cls, *args, **kwargs):
        session = get_db_session()
        user_repository = UserQuery(session)
        user_repository.get_skills()
        for skill in user_repository.get_skills():
            setattr(AllSkillsForm, skill.name, BooleanField(skill.name))
        return super(MyselfForm, cls).__new__(cls)
    
    def __init__(self, *args, **kwargs):
        class Dum:
            pass
        if 'obj' in kwargs:
            obj = kwargs['obj']
            all_skills = Dum()
            for skill in obj.skills:
                setattr(all_skills, skill.name, True)
            kwargs['all_skills'] = all_skills
        
        super(MyselfForm, self).__init__(*args, **kwargs)
