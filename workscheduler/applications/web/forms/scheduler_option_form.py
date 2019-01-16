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
from workscheduler.domains.models.scheduler import WorkCategory


class SkillField(Field):
    widget = TextInput()
    
    def _value(self):
        if self.data:
            return self.data.name
        else:
            return u''


class OperatorField(Field):
    widget = TextInput()
    
    def _value(self):
        if self.data:
            return self.data.name
        else:
            return u''


class WorkCategoryForm(FlaskForm):
    id = HiddenField()
    title = StringField(validators=[DataRequired(), Length(max=WorkCategory.title.type.length)])
    week_day_require = IntegerField()
    week_day_max = IntegerField()
    holiday_require = IntegerField()
    holiday_max = IntegerField()
    rest_days = IntegerField()
    max_times = IntegerField()
    essential_skills = FieldList(SkillField())
    essential_operators = FieldList(OperatorField())
    impossible_operators = FieldList(OperatorField())
    
    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        super(WorkCategoryForm, self).__init__(*args, **kwargs)


class AffiliationField(Field):
    widget = TextInput()
    
    def _value(self):
        if self.data:
            return self.data.name
        else:
            return u''


class SchedulerOptionForm(FlaskForm):
    id = HiddenField()
    affiliation = AffiliationField(validators=[DataRequired()])
    certified_skill = BooleanField()
    not_certified_skill = BooleanField()
    work_categories = []
    
    def __init__(self, *args, **kwargs):
        self.work_categories.clear()
        
        if 'obj' in kwargs and kwargs.get('obj'):
            obj = kwargs.get('obj')
            for work_category in obj.work_categories:
                self.work_categories.append(
                    WorkCategoryForm(obj=work_category, prefix='category-{}'.format(work_category.id))
                )
        if 'request' in kwargs:
            request = kwargs.get('request')
            for work_category_id in request.get('work_categories').split(','):
                self.work_categories.append(
                    WorkCategoryForm(prefix='category-{}'.format(work_category_id))
                )
        super(SchedulerOptionForm, self).__init__(*args, **kwargs)
