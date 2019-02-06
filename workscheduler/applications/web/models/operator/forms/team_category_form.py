# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms import BooleanField
from wtforms import IntegerField

from wtforms.validators import DataRequired
from wtforms.validators import Length

from workscheduler.domains.models.operator import TeamCategory


class TeamCategoryForm(FlaskForm):
    name = StringField(validators=[DataRequired(), Length(max=TeamCategory.name.type.length)])
    allow_multiple_affiliation = BooleanField()
    is_leader_required = BooleanField()
    min_member_count = IntegerField()
    max_member_count = IntegerField()
