# -*- coding: utf-8 -*-

"""Contains helper, and evaluation class which make monthly schedule."""
from itertools import chain
import math
from statistics import stdev
from statistics import mean

import numpy as np

from eart.indivisual import Individual

from eart import Genetic

from mypackages.utils.time import get_time_diff
from mypackages.utils.time import time_to_hour

from .ga_helper import build_parent_selection
from .ga_helper import build_survivor_selection
from .ga_helper import build_mutation_duplicate
from .ga_helper import build_crossover_duplicate


class SchedulerMonthlyHelperBase:
    """Base class for monthly evaluation.
    
    """
    
    def __init__(self, monthly_setting, operators):
        self._monthly_setting = monthly_setting
        self._operators = operators
        self._work_categories_hour = {x.id: time_to_hour(get_time_diff(x.at_to, x.at_from)) for x in
                                      {y.work_category for x in self._monthly_setting.days for y in x.details}}
        self._fixed_schedules_hour = {x.id: time_to_hour(get_time_diff(x.at_to, x.at_from))
                                      for x in {y for x in self._monthly_setting.days for y in x.fixed_schedules}}
    
    def _evaluate_by_require(self, transpose, weight):
        ratio = (weight / (len(transpose) * len(self._monthly_setting.days[0].details))) / 4
        adaptability = 0
        for schedule, day_setting in zip(transpose, self._monthly_setting.days):
            for detail in day_setting.details:
                work_category = detail.work_category
                max_require = work_category.week_day_max\
                    if not day_setting.is_holiday else work_category.holiday_max
                count = len([x for x in schedule if x == work_category.id])
                if count < detail.require:
                    adaptability += ratio * (1.8 ** (detail.require - count + 1))
                elif count > max_require:
                    adaptability += ratio * (2.2 ** (count - max_require + 1))
                elif count > detail.require:
                    adaptability += ratio * (1.4 ** (count - detail.require + 1))
        return weight - min(weight, adaptability)
    
    def _evaluate_by_essential_skill(self, transpose, weight):
        ratio = weight / (len(transpose) * len(self._monthly_setting.days[0].details))
        adaptability = 0
        for schedule, day_setting in zip(transpose, self._monthly_setting.days):
            for detail in day_setting.details:
                work_category = detail.work_category
                participant_skills = set(chain.from_iterable([self._operators[i].skills
                                                              for i, x in enumerate(schedule)
                                                              if x == work_category.id]))
                adaptability += sum([ratio for x in work_category.essential_skills if x not in participant_skills])
        return weight - min(weight, adaptability)
    
    def _evaluate_by_work_hours_std(self, schedules, weight):
        hours = [sum([self._work_categories_hour[y] if y in self._work_categories_hour else
                      self._fixed_schedules_hour[y] if y in self._fixed_schedules_hour else
                      0 for y in x]) for x in schedules]
        return weight - min(weight, stdev(hours) / (mean(hours) or 1))
    
    def _evaluate_by_skill_std(self, transpose, weight):
        adaptability = 0
        for detail in self._monthly_setting.days[0].details:
            days = [[self._operators[i] for i, y in enumerate(x) if y == detail.work_category.id]
                    for x in transpose]
            scores = [sum([z.score for y in x for z in y.skills]) for x in days]
            adaptability += stdev(scores) / (mean(scores) or 1)
        return weight - min(adaptability, weight)


class SchedulerMonthlyHelper(SchedulerMonthlyHelperBase):
    """Helper class for adjustment all operators schedule.
    
    This helper adjustment all operator's schedules by considering daily require number,
    skill level, and work hour average.
    
    """
    
    def __init__(self, monthly_setting, operators, schedules):
        super(SchedulerMonthlyHelper, self).__init__(monthly_setting, operators)
        self._operators = operators
        self._schedules = schedules
        self._era = 0
        self._base = range(len(self._schedules[0]))
        self._max_perturbation_rate = 33
        self._saturate_limit = 30000
        
    def _gene_to_schedule(self, gene):
        return [self._schedules[i][x] for i, x in enumerate(gene)]
    
    def _evaluate(self, gene):
        schedules = self._gene_to_schedule(gene)
        transpose = np.array(schedules).T
        adaptability = 0
        adaptability += self._evaluate_by_require(transpose, 8)
        adaptability += self._evaluate_by_essential_skill(transpose, 5)
        adaptability += self._evaluate_by_work_hours_std(schedules, 1)
        adaptability += self._evaluate_by_skill_std(transpose, 2)
        return adaptability
    
    def _evaluate_and_build_individual(self, gene):
        individual = Individual.new(gene, self._era)
        individual.adaptability = self._evaluate(gene)
        return individual
    
    def _perturb_genes(self, individual):
        percentage = abs(self._max_perturbation_rate - (individual.adaptability / 16 * 100 / 3))
        count = math.ceil(percentage / 100 * len(individual.gene))
        indices = np.random.choice(range(len(individual.gene)), count)
        gene = individual.gene[:]
        for index in indices:
            gene[index] = np.random.choice(self._base)
        return gene

    def _is_terminate(self, adapters):
        if not adapters:
            return False
        return self._era > self._saturate_limit \
            and len(set(map(lambda x: x.adaptability, adapters[-self._saturate_limit:]))) == 1
    
    def _scheduling(self, protobiont):
        individuals = [protobiont]
        adapters = []
        while not self._is_terminate(adapters):
            perturbed_gene = [self._perturb_genes(x) for x in individuals]
            individuals = individuals + [self._evaluate_and_build_individual(x) for x in perturbed_gene]
            individuals = sorted(individuals, key=lambda x: x.adaptability, reverse=True)
            individuals = individuals[:3]
            adapter = individuals[0]
            adapters.append(adapter)
            self._era += 1
            if self._era % 50 == 0:
                print("era: {}, adaptability: {}".format(self._era, adapter.adaptability))
        return adapters[-1]
    
    def _genetic_wrapper(self):
        genetic = Genetic(evaluation=self._evaluate, base_kind=range(len(self._schedules[0])),
                          gene_size=len(self._schedules), generation_size=1000, population_size=500, debug=True)
        genetic.parent_selection = build_parent_selection()
        genetic.survivor_selection = build_survivor_selection(genetic.population_size)
        genetic.mutation = build_mutation_duplicate()
        genetic.crossover = build_crossover_duplicate()
        genetic.compile()
        return genetic.run()
    
    def run(self):
        print("""====================
## start monthly schedule adjusting""")
        ret = self._genetic_wrapper()
        ret = self._scheduling(ret)
        print("last adaptability: {}".format(ret.adaptability))
        print("""## finished
====================""")
        return self._gene_to_schedule(ret.gene)
