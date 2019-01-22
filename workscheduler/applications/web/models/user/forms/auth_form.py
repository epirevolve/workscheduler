# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import (
    StringField, PasswordField
)
from wtforms.validators import (
    DataRequired, Length
)
from workscheduler.domains.models.user import User


class AuthForm(FlaskForm):
    login_id = StringField(validators=[DataRequired(), Length(max=User.login_id.type.length)])
    password = PasswordField(validators=[DataRequired(), Length(max=User.password.type.length)])
