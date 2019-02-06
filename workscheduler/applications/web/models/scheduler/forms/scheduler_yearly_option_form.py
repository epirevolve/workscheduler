# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms import IntegerField
from wtforms import Field
from wtforms import HiddenField
from wtforms import DateField
from wtforms.validators import DataRequired
from wtforms.widgets import TextInput


class AffiliationField(Field):
    widget = TextInput()
    
    def _value(self):
        if self.data:
            return self.data.name
        else:
            return u''


class SpecificVacationForm(FlaskForm):
    id = HiddenField()
    title = StringField(validators=[DataRequired()])
    at_from = DateField()
    at_to = DateField()
    days = IntegerField()


class SchedulerYearlyOptionForm(FlaskForm):
    affiliation = AffiliationField(validators=[DataRequired()])
