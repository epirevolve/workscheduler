# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import (
    StringField, BooleanField, DateField,
    IntegerField, Field, FieldList,
    HiddenField
)
from wtforms.widgets import TextInput
from wtforms.validators import (
    DataRequired, Length
)


class BelongField(Field):
    widget = TextInput()
    
    def _value(self):
        if self.data:
            return self.data.name
        else:
            return u''


class SchedulerCalendarForm(FlaskForm):
    schedule_of = DateField(validators=[DataRequired()])
    belong = BelongField(validators=[DataRequired()])
    holidays = IntegerField(default=8)
