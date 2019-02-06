# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms import PasswordField
from wtforms import HiddenField
from wtforms import Field
from wtforms.widgets import TextInput
from wtforms.validators import DataRequired
from wtforms.validators import Length

from workscheduler.domains.models.user import User


class AffiliationField(Field):
    widget = TextInput()

    def _value(self):
        if self.data:
            return self.data.name
        else:
            return u''


class UserForm(FlaskForm):
    id = HiddenField()
    login_id = StringField()
    password = PasswordField(validators=[DataRequired(), Length(max=User.password.type.length)])
    name = StringField(validators=[DataRequired(), Length(max=User.name.type.length)])
    affiliation = AffiliationField()
