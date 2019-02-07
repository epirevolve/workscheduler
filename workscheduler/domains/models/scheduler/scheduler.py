# -*- coding: utf-8 -*-

from datetime import date

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
from eart.crossovers import CircuitCrossover
from eart.crossovers import OrderlyCrossover
from eart import Genetic
from eart import MarriageSelection
from eart import TransitionSelection
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
    affiliation = relationship("Affiliation", uselist=False)
    month_year_settings = relationship("MonthYearSetting", secondary=associated_month_year_setting_table)
    certified_skill = Column(Boolean)
    not_certified_skill = Column(Boolean)
    work_categories = relationship("WorkCategory", secondary=associated_work_category_table)
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
    
    def _evaluate(self):
        pass
    
    @staticmethod
    def _build_marriage_selection():
        marriage_selection = MarriageSelection()
        marriage_selection.add(EliteSelection(), 0.05)
        marriage_selection.add(TournamentSelection(group_size=3))
        marriage_selection.compile()
        return marriage_selection
    
    @staticmethod
    def _build_transition_selection(population_size):
        transition_selection = TransitionSelection(const_population_size=population_size)
        transition_selection.add(EliteSelection(), 0.05)
        transition_selection.add(TournamentSelection(group_size=3))
        transition_selection.compile()
        return transition_selection
    
    @staticmethod
    def _build_mutation():
        mutation = Mutation(proliferate_mutation=True)
        mutation.add(WholeMutation(), 0.05)
        mutation.add(InvertMutation())
        mutation.add(TranslocateMutation())
        mutation.compile()
        return mutation
    
    @staticmethod
    def _build_crossover():
        crossover = Crossover()
        crossover.add(CircuitCrossover())
        crossover.add(OrderlyCrossover())
        crossover.compile()
        return crossover
    
    def run(self):
        genetic = Genetic(evaluation=self._evaluate, gene_kind='', generation_size=500)
        genetic.marriage_selection = self._build_marriage_selection()
        genetic.transition_selection = self._build_transition_selection(genetic.population_size)
        genetic.mutation = self._build_mutation()
        genetic.crossover = self._build_crossover()
        return genetic.run()
