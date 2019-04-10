# -*- coding: utf-8 -*-

from datetime import date

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

from eart.selections import EliteSelection
from eart.selections import TournamentSelection
from eart.mutations import WholeMutation
from eart.mutations import InvertMutation
from eart.mutations import TranslocateMutation
from eart.crossovers import MultiPointCrossover
from eart.crossovers import UniformityCrossover
from eart import Genetic
from eart import ParentSelection
from eart import SurvivorSelection
from eart import Mutation
from eart import Crossover

from mypackages.utils.uuid import UuidFactory
from .. import OrmBase
from ..user import Affiliation
from . import WorkCategory
from . import MonthlySetting
from . import YearlySetting

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
    
    def _dict_a_day(self, row, operators):
        d = {x.id: [] for x in self.work_categories}
        d['C'] = []
        for i, x in enumerate(row):
            if x == '-' or x == 'N':
                continue
            d[x].append(operators[i])
        return d
    
    @staticmethod
    def _evaluate_by_require(participants, detail):
        count = len(participants)
        return 0.3 - min(0.3, (0 if count == detail.require else
                               (count - detail.require) * 0.02 if count > detail.require else
                               (detail.require - count) * 0.05))
    
    @staticmethod
    def _evaluate_by_essential_skill(participants, detail):
        skill_ids = set(map(lambda y: y.id, [y for x in participants for y in x.skills]))
        adaptability = 0
        for skill in detail.work_category.essential_skills:
            adaptability += 0.02 if skill.id in skill_ids else -0.02
        return adaptability
    
    @staticmethod
    def _evaluate_by_essential_operator(participants, detail):
        member_ids = set(map(lambda y: y.id, participants))
        adaptability = 0
        for person in detail.work_category.essential_operators:
            adaptability += 0.02 if person.id in member_ids else -0.02
        return adaptability

    @staticmethod
    def _evaluate_by_impossible_operator(participants, detail):
        member_ids = set(map(lambda y: y.id, participants))
        adaptability = 0
        for person in detail.work_category.impossible_operators:
            adaptability += 0.02 if person.id not in member_ids else -0.02
        return adaptability
    
    @staticmethod
    def _evaluate_by_request(participants, requests):
        member_ids = set(map(lambda y: y.id, participants))
        adaptability = 0
        for person in requests:
            adaptability += 0.02 if person.id not in member_ids else -0.02
        return adaptability
    
    def _evaluate_by_day(self, day_data, daily_setting):
        adaptability = 0
        for detail in daily_setting.details:
            participants = day_data[detail.work_category.id]
            adaptability += self._evaluate_by_require(participants, detail)
            adaptability += self._evaluate_by_essential_skill(participants, detail)
            adaptability += self._evaluate_by_essential_operator(participants, detail)
            adaptability += self._evaluate_by_impossible_operator(participants, detail)
            adaptability += self._evaluate_by_request(participants, daily_setting.requests)
        return adaptability

    @staticmethod
    def _evaluate_by_prefixed_schedule(participants, daily_setting, monthly_setting):
        adaptability = 0
        date_ = date(monthly_setting.year, monthly_setting.month, daily_setting.day)
        for fixed_schedule in monthly_setting.fixed_schedules:
            if is_between(date_, fixed_schedule.on_from, fixed_schedule.on_to):
                pass
            member_ids = set(map(lambda y: y.id, participants))
            for person in fixed_schedule.participants:
                adaptability += 0.02 if person.id in member_ids else -0.02
        return adaptability

    def _evaluate_by_skill_sd(self):
        pass
    
    def _evaluate_by_month(self, day_dict, monthly_setting):
        adaptability = 0
        for day_data, daily_setting in zip(day_dict.values(), monthly_setting.days):
            adaptability = self._evaluate_by_day(day_data, daily_setting)
            participants = day_data['C']
            adaptability += self._evaluate_by_prefixed_schedule(participants, daily_setting, monthly_setting)
        return adaptability
        
    def _evaluate(self, operators, monthly_setting):
        def _fnc(gene):
            # column is day and row is operator
            schedule = np.reshape(gene, (len(operators), -1))
            adaptability = 0
            
            day_dict = {i: self._dict_a_day(x, operators) for i, x in enumerate(schedule.T)}
            adaptability += self._evaluate_by_month(day_dict, monthly_setting)
            return adaptability
        return _fnc
    
    @staticmethod
    def _build_parent_selection():
        parent_selection = ParentSelection()
        parent_selection.add(EliteSelection(), 0.05)
        parent_selection.add(TournamentSelection(group_size=3))
        return parent_selection
    
    @staticmethod
    def _build_survivor_selection(population_size):
        survivor_selection = SurvivorSelection(const_population_size=population_size)
        survivor_selection.add(EliteSelection(), 0.05)
        survivor_selection.add(TournamentSelection(group_size=3))
        return survivor_selection
    
    @staticmethod
    def _build_mutation():
        mutation = Mutation(proliferate_mutation=True)
        mutation.add(WholeMutation(), 0.05)
        mutation.add(InvertMutation())
        mutation.add(TranslocateMutation())
        return mutation
    
    @staticmethod
    def _build_crossover():
        crossover = Crossover()
        crossover.add(MultiPointCrossover())
        crossover.add(UniformityCrossover())
        return crossover
    
    def run(self, month: int, year: int, operators):
        monthly_setting = self.monthly_setting(month, year)
        evaluate = self._evaluate(operators, monthly_setting)
        
        base_kind = list(map(lambda x: x.id, self.work_categories))
        
        genetic = Genetic(evaluation=evaluate, base_kind=['-', 'N', 'C'] + base_kind,
                          gene_size=len(monthly_setting.days) * len(operators),
                          generation_size=1000, population_size=1000, debug=True)
        genetic.parent_selection = self._build_parent_selection()
        genetic.survivor_selection = self._build_survivor_selection(genetic.population_size)
        genetic.mutation = self._build_mutation()
        genetic.crossover = self._build_crossover()
        genetic.compile()
        return genetic.run()
