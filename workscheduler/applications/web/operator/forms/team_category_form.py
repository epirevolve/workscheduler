# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import (
    StringField, BooleanField, IntegerField
)
from wtforms.validators import (
    DataRequired, Length
)
from workscheduler.domains.models.operator import TeamCategory


class TeamCategoryForm(FlaskForm):
    name = StringField(validators=[DataRequired(), Length(max=TeamCategory.name.type.length)])
    allow_multiple_affiliationing = BooleanField()
    is_leader_required = BooleanField()
    min_member_count = IntegerField()
    max_member_count = IntegerField()
