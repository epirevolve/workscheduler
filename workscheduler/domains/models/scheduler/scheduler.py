# -*- coding: utf-8 -*-

from datetime import date
from itertools import groupby
from statistics import stdev

import numpy as np

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.orm import validates
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import String
from sqlalchemy.types import Boolean
from sqlalchemy.types import DateTime

from mypackages.utils.date import is_between
from mypackages.utils.time import get_time_diff
from mypackages.utils.time import time_to_hour

from eart import Genetic

from mypackages.utils.uuid import UuidFactory
from .. import OrmBase
from ..user import Affiliation
from . import WorkCategory
from . import MonthlySetting
from . import YearlySetting

from .scheduler_helper import build_parent_selection
from .scheduler_helper import build_survivor_selection
from .scheduler_helper import build_mutation
from .scheduler_helper import build_crossover

associated_monthly_setting_table\
    = Table("associated_monthly_setting", OrmBase.metadata,
            Column("left_id", String, ForeignKey('schedulers.id')),
            Column("right_id", String, ForeignKey('monthly_settings.id')))


associated_yearly_setting_table\
    = Table("associated_yearly_setting", OrmBase.metadata,
            Column("left_id", String, ForeignKey('schedulers.id')),
            Column("right_id", String, ForeignKey('yearly_settings.id')))


associated_work_category_table\
    = Table("associated_work_category", OrmBase.metadata,
            Column("left_id", String, ForeignKey('schedulers.id')),
            Column("right_id", String, ForeignKey('work_categories.id')))


class Scheduler(OrmBase):
    __tablename__ = "schedulers"
    id = Column(String, primary_key=True)
    _affiliation_id = Column(String, ForeignKey('affiliations.id'))
    affiliation = relationship("Affiliation", uselist=False, lazy='joined')
    monthly_settings = relationship("MonthlySetting", secondary=associated_monthly_setting_table, lazy='joined')
    yearly_settings = relationship("YearlySetting", secondary=associated_yearly_setting_table, lazy='joined')
    certified_skill = Column(Boolean)
    not_certified_skill = Column(Boolean)
    is_launching = Column(Boolean)
    work_categories = relationship("WorkCategory", secondary=associated_work_category_table, lazy='joined')
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id_: str, affiliation: Affiliation,
                 certified_skill: bool, not_certified_skill: bool,
                 work_categories: [WorkCategory]):
        self.id = id_
        self.affiliation = affiliation
        self.monthly_settings = []
        self.yearly_settings = []
        self.certified_skill = certified_skill
        self.not_certified_skill = not_certified_skill
        self.work_categories = work_categories
        self.is_launching = False

    @validates("id, affiliation")
    def validate(self, key, value):
        return super(Scheduler, self).validate(Scheduler, key, value)

    @staticmethod
    def new_scheduler(affiliation: Affiliation):
        return Scheduler(UuidFactory.new_uuid(), affiliation,
                         True, True, [])
    
    def monthly_setting(self, month: int, year: int):
        monthly_setting = list(filter(lambda x: x.year == year and x.month == month,
                                      self.monthly_settings))
        if not monthly_setting:
            monthly_setting = MonthlySetting.new_monthly_setting(
                self.work_categories, year, month)
            self.monthly_settings.append(monthly_setting)
        else:
            monthly_setting = monthly_setting[0]
        return monthly_setting
    
    def yearly_setting(self, year: int):
        yearly_setting = list(filter(lambda x: x.year == year, self.yearly_settings))
        if not yearly_setting:
            yearly_setting = YearlySetting.new_yearly_setting(year)
            self.yearly_settings.append(yearly_setting)
        else:
            yearly_setting = yearly_setting[0]
        return yearly_setting
    
    def _dict_a_day(self, day, operators):
        d = {x.id: [] for x in self.work_categories}
        d[' '] = []
        d['-'] = []
        d['N'] = []
        for i, x in enumerate(day):
            d[x].append(operators[i])
        return d
    
    @staticmethod
    def _evaluate_by_require(participants, require, weight):
        count = len(participants)
        ratio = weight / 10
        return weight - min(weight, 0 if count == require else abs(count - require) * ratio)
    
    @staticmethod
    def _evaluate_by_max(participants, work_category, day_setting, weight):
        count = len(participants)
        ratio = weight / 10
        max_require = work_category.week_day_max if day_setting.day_name in ['SAT', 'SUN'] \
            else work_category.holiday_max
        return weight - min(weight, 0 if count <= max_require else abs(count - max_require) * ratio)
    
    @staticmethod
    def _evaluate_by_essential_skill(participants, essential_skills, weight):
        skill_ids = set(map(lambda y: y.id, [y for x in participants for y in x.skills]))
        ratio = weight / (len(essential_skills) or 1)
        adaptability = sum([ratio for x in essential_skills if x.id not in skill_ids])
        return weight - adaptability
    
    @staticmethod
    def _evaluate_by_essential_operator(participants, essential_operators, weight):
        member_ids = set(map(lambda y: y.id, participants))
        ratio = weight / (len(essential_operators) or 1)
        adaptability = sum([ratio for x in essential_operators if x.id not in member_ids])
        return weight - adaptability

    @staticmethod
    def _evaluate_by_impossible_operator(participants, impossible_operators, weight):
        member_ids = set(map(lambda y: y.id, participants))
        ratio = weight / (len(impossible_operators) or 1)
        adaptability = sum([ratio for x in impossible_operators if x.id in member_ids])
        return weight - adaptability
    
    @staticmethod
    def _evaluate_by_request(day_data, requests, weight):
        participants = day_data[' ']
        member_ids = set(map(lambda y: y.id, participants))
        ratio = weight / (len(requests) or 1)
        adaptability = sum([ratio for x in requests if x.id not in member_ids])
        return weight - adaptability
    
    @staticmethod
    def _evaluate_by_prefixed_schedule(day_data, daily_setting, monthly_setting, weight):
        adaptability = 0
        ratio = weight / (len(monthly_setting.fixed_schedules) or 1)
        date_ = date(monthly_setting.year, monthly_setting.month, daily_setting.day)
        for fixed_schedule in monthly_setting.fixed_schedules:
            participants = day_data[fixed_schedule.id]
            if not is_between(date_, fixed_schedule.on_from, fixed_schedule.on_to):
                adaptability += ratio * len(participants)
            member_ids = set(map(lambda y: y.id, participants))
            adaptability += sum([ratio for x in fixed_schedule.participants if x.id not in member_ids])
        return weight - adaptability

    def _evaluate_by_day(self, day_data, day_setting, monthly_setting):
        adaptability = 0
        ratio = len(monthly_setting.days) * len(day_setting.details)
        for detail in day_setting.details:
            participants = day_data[detail.work_category.id]
            adaptability += self._evaluate_by_require(participants, detail.require, 10 / ratio)
            adaptability += self._evaluate_by_max(participants, detail.work_category, day_setting, 6 / ratio)
            adaptability += self._evaluate_by_essential_skill(
                participants, detail.work_category.essential_skills, 10 / ratio)
            adaptability += self._evaluate_by_essential_operator(
                participants, detail.work_category.essential_operators, 10 / ratio)
            adaptability += self._evaluate_by_impossible_operator(
                participants, detail.work_category.impossible_operators, 10 / ratio)
        ratio = len(monthly_setting.days)
        adaptability += self._evaluate_by_request(day_data, day_setting.requests, 10 / ratio)
        adaptability += self._evaluate_by_prefixed_schedule(day_data, day_setting, monthly_setting, 10 / ratio)
        return adaptability
    
    @staticmethod
    def _evaluate_by_skill_sd():
        pass
    
    def _evaluate_by_month(self, day_dict, monthly_setting):
        adaptability = 0
        for day_data, daily_setting in zip(day_dict.values(), monthly_setting.days):
            adaptability += self._evaluate_by_day(day_data, daily_setting, monthly_setting)
        return adaptability
    
    def _evaluate_by_work_hours_std(self, schedules, fixed_schedules):
        work_category_hour = {x.id: time_to_hour(get_time_diff(x.at_to, x.at_from)) for x in self.work_categories}
        work_category_ids = [x.id for x in self.work_categories]
        fixed_schedule_hour = {x.id: time_to_hour(get_time_diff(x.at_to, x.at_from)) for x in fixed_schedules}
        fixed_schedule_ids = [x.id for x in fixed_schedules]
        hours = [sum([work_category_hour[y] if y in work_category_ids else
                      fixed_schedule_hour[y] if y in fixed_schedule_ids else
                      0 for y in x]) for x in schedules]
        return 10 - min(10, stdev(hours))

    @staticmethod
    def _evaluate_by_holiday(schedules, holidays):
        ratio = 10 / len(schedules)
        adaptability = sum([ratio for x in schedules if len(list(filter(lambda y: y == ' ', x))) != holidays])
        return 10 - min(10, adaptability)
    
    @staticmethod
    def _evaluate_by_continuous_attendance(schedules):
        ratio = 10 / (len(schedules) * 2)
        continuous_attendance = [[sum(1 for _ in y) for z, y in groupby(x, key=lambda z: z == ' ') if not z]
                                 for x in schedules]
        adaptability = sum([ratio for x in continuous_attendance for y in x if y > 5])
        return 10 - min(10, adaptability)
    
    @staticmethod
    def _evaluate_by_n_day(schedules):
        n_days = [sum([1 for y in x if y == 'N']) for x in schedules]
        return 6 - min(6, stdev(n_days))
    
    def _evaluate_by_day_offs(self, schedules):
        adaptability = 0
        ratio = 10 / (len(schedules) * 16)
        day_offs_work_categories = {x.id: x for x in self.work_categories if x.day_offs != 0}
        for x in schedules:
            i = 0
            len_x = len(x)
            while i < len_x:
                if x[i] in day_offs_work_categories:
                    day_offs = day_offs_work_categories[x[i]].day_offs
                    if i + day_offs >= len_x:
                        day_offs = len_x - i - 1
                    if list(x[i+1: i+day_offs+1]) != ['-'] * day_offs:
                        adaptability += ratio
                    i += day_offs
                elif x[i] == '-':
                    adaptability += ratio
                i += 1
        return 10 - min(10, adaptability)

    @staticmethod
    def _evaluate_by_rest(schedule):
        pass
    
    @staticmethod
    def _evaluate_by_available_max_times(schedules):
        pass

    def _evaluate_by_operator(self, schedules, monthly_setting):
        adaptability = 0
        adaptability += self._evaluate_by_work_hours_std(schedules, monthly_setting.fixed_schedules)
        adaptability += self._evaluate_by_holiday(schedules, monthly_setting.holidays)
        adaptability += self._evaluate_by_continuous_attendance(schedules)
        adaptability += self._evaluate_by_n_day(schedules)
        adaptability += self._evaluate_by_day_offs(schedules)
        return adaptability
        
    def _evaluate(self, operators, monthly_setting):
        def _fnc(gene):
            # column is day and row is operator
            schedules = np.reshape(gene, (len(operators), -1))
            adaptability = 0
            
            day_dict = {i: self._dict_a_day(x, operators) for i, x in enumerate(schedules.T)}
            adaptability += self._evaluate_by_month(day_dict, monthly_setting)
            adaptability += self._evaluate_by_operator(schedules, monthly_setting)
            return adaptability
        return _fnc
    
    def run(self, month: int, year: int, operators):
        monthly_setting = self.monthly_setting(month, year)
        evaluate = self._evaluate(operators, monthly_setting)
        
        base_kind = list(map(lambda x: x.id, self.work_categories))\
            + list(map(lambda x: x.id, monthly_setting.fixed_schedules))
        
        genetic = Genetic(evaluation=evaluate, base_kind=[' ', 'N', '-'] + base_kind,
                          gene_size=len(monthly_setting.days) * len(operators),
                          generation_size=1000, population_size=1000, debug=True)
        genetic.parent_selection = build_parent_selection()
        genetic.survivor_selection = build_survivor_selection(genetic.population_size)
        genetic.mutation = build_mutation()
        genetic.crossover = build_crossover()
        genetic.compile()
        ret = genetic.run()
        return np.reshape(ret.gene, (len(operators), -1))
