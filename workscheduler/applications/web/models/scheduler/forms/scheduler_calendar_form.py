# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms import BooleanField
from wtforms import IntegerField
from wtforms import DateField
from wtforms import Field
from wtforms import FieldList
from wtforms import HiddenField
from wtforms.widgets import TextInput
from wtforms.validators import DataRequired

from workscheduler.applications.services import SchedulerQuery
from workscheduler.applications.web import get_db_session


class WorkCategoryForm(FlaskForm):
    id = HiddenField()
    title = StringField()
    is_obtain = BooleanField()
    
    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        super(WorkCategoryForm, self).__init__(*args, **kwargs)
        

class OperatorField(Field):
    widget = TextInput()
    
    def _value(self):
        if self.data:
            return self.data.name
        else:
            return u''
        
        
class FixedScheduleForm(FlaskForm):
    id = HiddenField()
    title = StringField()
    date_from = DateField()
    date_to = DateField()
    all_work_categories = []
    participants = FieldList(OperatorField())
    
    def __init__(self, *args, **kwargs):
        work_categories = SchedulerQuery(get_db_session())\
            .get_scheduler_of_affiliation_id(kwargs.get('affiliation_id')).work_categories
        
        self.all_work_categories.clear()

        if 'obj' in kwargs:
            obj = kwargs.get('obj')
            work_category_ids = [x.id for x in obj.work_categories]
    
            for work_category in work_categories:
                if work_category.id in work_category_ids:
                    setattr(work_category, 'is_obtain', True)
        
        for work_category in work_categories:
            self.all_work_categories.append(
                WorkCategoryForm(obj=work_category, prefix='work-category-{}'.format(work_category.id))
            )
            
        kwargs['csrf_enabled'] = False
        super(FixedScheduleForm, self).__init__(*args, **kwargs)


class AffiliationField(Field):
    widget = TextInput()
    
    def _value(self):
        if self.data:
            return self.data.name
        else:
            return u''


class SchedulerCalendarForm(FlaskForm):
    id = HiddenField()
    affiliation = AffiliationField(validators=[DataRequired()])
    schedule_of = DateField(validators=[DataRequired()])
    days = []
    holidays = IntegerField(default=8)
    fixed_schedules = []

    def __init__(self, *args, **kwargs):
        self.fixed_schedules.clear()
    
        if 'obj' in kwargs and kwargs.get('obj'):
            obj = kwargs.get('obj')
            for fixed_schedule in obj.fixed_schedules:
                self.fixed_schedules.append(
                    FixedScheduleForm(affiliation_id=obj.affiliation.id, obj=fixed_schedule,
                                      prefix='fixed-schedule-{}'.format(fixed_schedule.id))
                )
        if 'request' in kwargs:
            request = kwargs.get('request')
            for fixed_schedule_id in request.get('fixed_schedules').split(','):
                if not fixed_schedule_id:
                    continue
                self.fixed_schedules.append(
                    FixedScheduleForm(affiliation_id=request.affiliation,
                                      prefix='fixed-schedule-{}'.format(fixed_schedule_id))
                )
        super(SchedulerCalendarForm, self).__init__(*args, **kwargs)
