# -*- coding: utf-8 -*-

from domains.models.scheduler import Scheduler
from domains.models.scheduler import MonthlySetting
from domains.models.scheduler import YearlySetting
from domains.models.scheduler import WorkCategory
from domains.models.scheduler import DaySetting
from domains.models.scheduler import DayDetail
from domains.models.scheduler import Request
from domains.models.scheduler import FixedSchedule
from domains.models.scheduler import Vacation
from domains.models.user import Affiliation
from domains.models.user import User
from domains.models.operator import Skill
from domains.models.operator import Relation
from domains.models.operator import Operator
from domains.models.schedule import DayWorkCategory
from domains.models.schedule import ScheduleComponent
from domains.models.schedule import Schedule

from applications.web.util.functions.converter import to_date
from applications.web.util.functions.converter import to_time
from applications.web.util.functions.converter import to_datetime


def default_pop(data, key, default=None):
    return data.pop(key) if data and key in data else default


def to_affiliation(data):
    if not data:
        return None
    return Affiliation(**data)


def to_user(data):
    if not data:
        return None
    affiliation = to_affiliation(default_pop(data, 'affiliation'))
    return User(**data, affiliation=affiliation)


def to_skill(data):
    if not data:
        return None
    return Skill(**data)


def to_relation(data):
    if not data:
        return None
    myself = to_operator(default_pop(data, 'myself'))
    colleague = to_operator(default_pop(data, 'colleague'))
    return Relation(**data, myself=myself, colleague=colleague)


def to_operator(data):
    if not data:
        return None
    user = to_user(default_pop(data, 'user'))
    skills = [to_skill(x) for x in default_pop(data, 'skills', [])]
    relations = [to_relation(x) for x in default_pop(data, 'relations', [])]
    ojt = to_operator(default_pop(data, 'ojt'))
    return Operator(**data, user=user, skills=skills,
                    relations=relations, ojt=ojt)


def to_request(data):
    if not data:
        return None
    at_from = to_datetime(default_pop(data, 'at_from'))
    at_to = to_datetime(default_pop(data, 'at_to'))
    operator = to_operator(default_pop(data, 'operator'))
    return Request(**data, at_from=at_from, at_to=at_to, operator=operator)


def to_fixed_schedule(data):
    if not data:
        return None
    on_from = to_date(default_pop(data, 'on_from'))
    on_to = to_date(default_pop(data, 'on_to'))
    at_from = to_time(default_pop(data, 'at_from'))
    at_to = to_time(default_pop(data, 'at_to'))
    participants = [to_operator(x) for x in default_pop(data, 'participants', [])]
    return FixedSchedule(**data, on_from=on_from, on_to=on_to,
                         at_from=at_from, at_to=at_to, participants=participants)


def to_work_category(data):
    if not data:
        return None
    at_from = to_time(default_pop(data, 'at_from'))
    at_to = to_time(default_pop(data, 'at_to'))
    week_day_operators = [to_operator(x) for x in default_pop(data, 'week_day_operators', [])]
    holiday_operators = [to_operator(x) for x in default_pop(data, 'holiday_operators', [])]
    essential_skills = [to_skill(x) for x in default_pop(data, 'essential_skills', [])]
    exclusive_operators = [to_operator(x) for x in default_pop(data, 'exclusive_operators', [])]
    impossible_operators = [to_operator(x) for x in default_pop(data, 'impossible_operators', [])]
    return WorkCategory(**data, at_from=at_from, at_to=at_to,
                        week_day_operators=week_day_operators, holiday_operators=holiday_operators,
                        essential_skills=essential_skills, exclusive_operators=exclusive_operators,
                        impossible_operators=impossible_operators)


def to_day_detail(data):
    if not data:
        return None
    work_category = to_work_category(default_pop(data, 'work_category'))
    return DayDetail(**data, work_category=work_category)


def to_day_setting(data):
    if not data:
        return None
    details = [to_day_detail(x) for x in default_pop(data, 'details', [])]
    requests = [to_request(x) for x in default_pop(data, 'requests', [])]
    fixed_schedules = [to_fixed_schedule(x) for x in default_pop(data, 'fixed_schedules', [])]
    return DaySetting(**data, details=details, requests=requests, fixed_schedules=fixed_schedules)


def to_monthly_setting(data):
    if not data:
        return None
    days = [to_day_setting(x) for x in default_pop(data, 'days', [])]
    return MonthlySetting(**data, days=days)


def to_vacation(data):
    if not data:
        return None
    on_from = to_date(default_pop(data, 'on_from'))
    on_to = to_date(default_pop(data, 'on_to'))
    return Vacation(**data, on_from=on_from, on_to=on_to)


def to_yearly_setting(data):
    if not data:
        return None
    vacations = [to_vacation(x) for x in default_pop(data, 'vacations', [])]
    return YearlySetting(**data, vacations=vacations)


def to_scheduler(data):
    if not data:
        return None
    affiliation = to_affiliation(default_pop(data, 'affiliation'))
    monthly_settings = [to_monthly_setting(x) for x in default_pop(data, 'monthly_settings', [])]
    yearly_settings = [to_yearly_setting(x) for x in default_pop(data, 'yearly_settings', [])]
    work_categories = [to_work_category(x) for x in default_pop(data, 'work_categories', [])]
    return Scheduler(**data, affiliation=affiliation, monthly_settings=monthly_settings,
                     yearly_settings=yearly_settings, work_categories=work_categories)


def to_day_work_category(data):
    if not data:
        return None
    return DayWorkCategory(**data)


def to_schedule_component(data):
    if not data:
        return None
    operator = to_operator(default_pop(data, 'operator'))
    day_work_category = to_day_work_category(default_pop(data, 'day_work_category'))
    return ScheduleComponent(**data, operator=operator, day_work_category=day_work_category)


def to_schedule(data):
    if not data:
        return None
    components = [to_schedule_component(x) for x in default_pop(data, 'schedule_component', [])]
    return Schedule(**data, schedule_components=components)
