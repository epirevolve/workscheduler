# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import (
    StringField, BooleanField, DateField,
    IntegerField, Field
)
from wtforms.widgets import TextInput
from wtforms.validators import (
    DataRequired, Length
)
from workscheduler.domains.models.schedule import WorkCategory
from ..util import get_next_month


class SkillField(Field):
    pass


class WorkCategoryForm(FlaskForm):
    title = StringField(validators=[DataRequired(), Length(max=WorkCategory.title.type.length)])
    default = IntegerField()
    holiday = IntegerField()
    rest_next_day = BooleanField()
    essential_skills = []


class BelongField(Field):
    widget = TextInput()
    
    def _value(self):
        if self.data:
            return self.data.name
        else:
            return u''


class SchedulerOptionForm(FlaskForm):
    belong = BelongField(validators=[DataRequired()])
    schedule_of = DateField(default=get_next_month(), validators=[DataRequired()])
    certified_skill = BooleanField()
    not_certified_skill = BooleanField()
    work_categories = []
    
    def __init__(self, *args, **kwargs):
        self.work_categories.clear()
        
        if 'obj' in kwargs:
            obj = kwargs.get('obj')
            
            for work_category in obj.work_categories:
                self.work_categories.append(
                    WorkCategoryForm(obj=work_category, prefix='category-{}'.format(work_category.id))
                )

        super(SchedulerOptionForm, self).__init__(*args, **kwargs)
