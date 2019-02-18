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
from . import MonthYearSetting

associated_month_year_setting_table\
    = Table("associated_month_year_setting", OrmBase.metadata,
            Column("left_id", String, ForeignKey('schedulers.id')),
            Column("right_id", String, ForeignKey('month_year_settings.id')))


associated_work_category_table\
    = Table("associated_work_category", OrmBase.metadata,
            Column("left_id", String, ForeignKey('schedulers.id')),
            Column("right_id", String, ForeignKey('work_categories.id')))


class Scheduler(OrmBase):
    __tablename__ = "schedulers"
    id = Column(String, primary_key=True)
    _affiliation_id = Column(String, ForeignKey('affiliations.id'))
    affiliation = relationship("Affiliation", uselist=False, lazy='joined')
    month_year_settings = relationship("MonthYearSetting", secondary=associated_month_year_setting_table, lazy='joined')
    certified_skill = Column(Boolean)
    not_certified_skill = Column(Boolean)
    work_categories = relationship("WorkCategory", secondary=associated_work_category_table, lazy='joined')
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id_: str, affiliation: Affiliation,
                 certified_skill: bool, not_certified_skill: bool,
                 work_categories: [WorkCategory]):
        self.id = id_
        self.affiliation = affiliation
        self.month_year_settings = []
        self.certified_skill = certified_skill
        self.not_certified_skill = not_certified_skill
        self.work_categories = work_categories

    @validates("id, affiliation")
    def validate(self, key, value):
        return super(Scheduler, self).validate(Scheduler, key, value)

    @staticmethod
    def new_scheduler(affiliation: Affiliation):
        return Scheduler(UuidFactory.new_uuid(), affiliation,
                         True, True, [])
    
    def month_year_setting(self, schedule_of: date):
        month_year_setting = list(filter(lambda x: x.year == schedule_of.year and x.month == schedule_of.month,
                                         self.month_year_settings))
        if not month_year_setting:
            month_year_setting = MonthYearSetting.new_month_year(
                self.work_categories, schedule_of.year, schedule_of.month)
            self.month_year_settings.append(month_year_setting)
        else:
            month_year_setting = month_year_setting[0]
        return month_year_setting
    
    @staticmethod
    def _evaluate_by_day(day_dict, month_year_setting):
        adaptability = 0
        for schedule_day, scheduler_day in zip(day_dict.values(), month_year_setting.days):
            for detail in scheduler_day.details:
                members = schedule_day[detail.work_category.id]
                count = len(members)
                adaptability += 0.3 - min(0.3, (0 if count >= detail.require else (detail.require - count) * 0.05))
                member_skills = [y for x in members for y in x.skills]
                skill_ids = set(map(lambda y: y.id, member_skills))
                member_ids = set(map(lambda y: y.id, members))
                for skill in detail.work_category.essential_skills:
                    adaptability += 0.2 if skill.id in skill_ids else 0
                for person in detail.work_category.essential_operators:
                    adaptability += 0.2 if person.id in member_ids else 0
                for person in detail.work_category.impossible_operators:
                    adaptability += 0.2 if person.id not in member_ids else 0
        return adaptability
    
    @staticmethod
    def _evaluate_by_operator(operator_dict, month_year_setting):
        return 0
    
    def _evaluate(self, operators, month_year_setting):
        def _fnc(gene):
            # column is day and row is operator
            schedule = np.reshape(gene, (len(operators), -1))
            adaptability = 0
            
            def dict_by_day(row):
                d = {x.id: [] for x in self.work_categories}
                for i, x in enumerate(row):
                    if x == '0':
                        continue
                    d[x].append(operators[i])
                return d
            day_dict = {i: dict_by_day(x) for i, x in enumerate(schedule.T)}
            adaptability += self._evaluate_by_day(day_dict, month_year_setting)
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
    
    def run(self, schedule_of: date, operators):
        month_year_setting = self.month_year_setting(schedule_of)
        evaluate = self._evaluate(operators, month_year_setting)
        
        base_kind = list(map(lambda x: x.id, self.work_categories))
        
        genetic = Genetic(evaluation=evaluate, base_kind=[0] + base_kind,
                          gene_size=len(month_year_setting.days) * len(operators),
                          generation_size=1000, population_size=1000, debug=True)
        genetic.parent_selection = self._build_parent_selection()
        genetic.survivor_selection = self._build_survivor_selection(genetic.population_size)
        genetic.mutation = self._build_mutation()
        genetic.crossover = self._build_crossover()
        genetic.compile()
        return genetic.run()