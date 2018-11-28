# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import (
    StringField, HiddenField, BooleanField,
)
from wtforms.validators import (
    DataRequired, Length
)
from workscheduler.domains.models.user import User


class UsersForm(FlaskForm):
    id = HiddenField()
    login_id = StringField(validators=[DataRequired(), Length(max=User.login_id.type.length)])
    name = StringField(validators=[DataRequired(), Length(max=User.name.type.length)])
    is_admin = BooleanField()
    is_operator = BooleanField()
