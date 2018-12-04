# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import (
    StringField, PasswordField, HiddenField
)
from wtforms.validators import (
    DataRequired, Length
)
from workscheduler.domains.models.user import User


class UserForm(FlaskForm):
    id = HiddenField()
    login_id = StringField()
    password = PasswordField(validators=[DataRequired(), Length(max=User.password.type.length)])
    name = StringField(validators=[DataRequired(), Length(max=User.name.type.length)])
