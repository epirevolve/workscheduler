# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import (
    Field
)
from wtforms.validators import (
    DataRequired
)
from wtforms.widgets import TextInput


class AffiliationField(Field):
    widget = TextInput()
    
    def _value(self):
        if self.data:
            return self.data.name
        else:
            return u''


class SchedulerYearlyOptionForm(FlaskForm):
    affiliation = AffiliationField(validators=[DataRequired()])
