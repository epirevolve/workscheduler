# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms import PasswordField
from wtforms.validators import DataRequired
from wtforms.validators import Length

from workscheduler.domains.models.user import User


class AuthForm(FlaskForm):
    login_id = StringField(validators=[DataRequired(), Length(max=User.login_id.type.length)])
    password = PasswordField(validators=[DataRequired(), Length(max=User.password.type.length)])
