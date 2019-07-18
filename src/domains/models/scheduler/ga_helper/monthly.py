# -*- coding: utf-8 -*-

"""Contains helper, and evaluation class which make monthly schedule."""
from collections import defaultdict
from itertools import chain
import math
from statistics import stdev
from statistics import mean

import numpy as np

from eart.indivisual import Individual
from eart import Genetic

from utils.time import get_time_diff
from utils.time import time_to_hour

from .ga_helper import build_parent_selection
from .ga_helper import build_survivor_selection
from .ga_helper import build_mutation_duplicate
from .ga_helper import build_crossover_duplicate


class SchedulerMonthlyHelperBase:
    """Base class for monthly evaluation.
    
    """
    
    def __init__(self, monthly_setting, operators):
        self._monthly_setting = monthly_setting
        self._work_categories = {y.work_category for x in self._monthly_setting.days for y in x.details}
        self._operators = operators
        self._work_categories_hour = {x.id: time_to_hour(get_time_diff(x.at_to, x.at_from)) for x in
                                      {y.work_category for x in self._monthly_setting.days for y in x.details}}
        self._fixed_schedules_hour = {x.id: time_to_hour(get_time_diff(x.at_to, x.at_from))
                                      for x in {y for x in self._monthly_setting.days for y in x.fixed_schedules}}

    def _evaluate_by_skill_std(self, transpose, weight):
        adaptability = 0
        for work_category in self._work_categories:
            days = [[self._operators[i] for i, y in enumerate(x) if y == work_category.id]
                    for x in transpose]
            scores = [sum([z.score for y in x for z in y.skills]) for x in days]
            adaptability += stdev(scores) / (mean(scores) or 1)
        return weight - min(adaptability, weight)

    def _evaluate_by_require(self, transpose, *, less_weight, excess_weight):
        less_ratio = 0.2
        excess_ratio = 0.05
        for schedule, day_setting in zip(transpose, self._monthly_setting.days):
            for detail in day_setting.details:
                work_category = detail.work_category
                count = len([x for x in schedule if x == work_category.id])
                if count < detail.require:
                    less_weight -= less_ratio * (detail.require - count)
                diff = count - detail.require - 2
                if diff > 0:
                    excess_weight -= excess_ratio * diff ** 2
        return sum([max(0, less_weight), max(0, excess_weight)])

    def _evaluate_by_require_diff_std(self, transpose, weight):
        excess_diff = defaultdict(list)
        for schedule, day_setting in zip(transpose, self._monthly_setting.days):
            for detail in day_setting.details:
                count = len([x for x in schedule if x == detail.work_category.id])
                excess_diff[detail.work_category].append(count - detail.require)
        excess_diff_cv = [stdev(x) / (mean(x) or 1) if len(x) > 2 else 1 for x in excess_diff.values()]
        return min(1, max(0, (1 - sum(excess_diff_cv) / len(excess_diff_cv)) * weight))

    def _evaluate_by_essential_skill(self, transpose):
        ratio = 0.02
        adaptability = 0
        for schedule, day_setting in zip(transpose, self._monthly_setting.days):
            for detail in day_setting.details:
                work_category = detail.work_category
                participant_skills = set(chain.from_iterable(
                    [self._operators[i].skills for i, x in enumerate(schedule) if x == work_category.id]))
                adaptability += sum([ratio for x in work_category.essential_skills if x not in participant_skills])
        return max(0, 1 - adaptability)


class SchedulerMonthlyHelper(SchedulerMonthlyHelperBase):
    """Helper class for adjustment all operators schedule.
    
    This helper adjustment all operator's schedules by considering daily require number,
    skill level, and work hour average.
    
    """
    
    def __init__(self, monthly_setting, operators, schedules):
        super(SchedulerMonthlyHelper, self).__init__(monthly_setting, operators)
        self._operators = operators
        self._schedules = schedules
        self._era = 1
        self._base = range(len(self._schedules[0]))
        self._max_perturbation_rate = 33
        self._saturate_limit = 50000
        
    def _gene_to_schedule(self, gene):
        return [self._schedules[i][x] for i, x in enumerate(gene)]
    
    def _evaluate(self, gene):
        schedules = self._gene_to_schedule(gene)
        transpose = np.array(schedules).T
        adaptability = 0
        adaptability += self._evaluate_by_skill_std(transpose, 1)
        adaptability += self._evaluate_by_require(transpose, less_weight=5, excess_weight=2.5)
        adaptability += self._evaluate_by_require_diff_std(transpose, 1.5)
        adaptability *= self._evaluate_by_essential_skill(transpose)
        return adaptability
    
    def _genetic_wrapper(self):
        genetic = Genetic(evaluation=self._evaluate, base_kind=range(len(self._schedules[0])),
                          gene_size=len(self._schedules), generation_size=1000, population_size=500,
                          saturated_limit=30, debug=True)
        genetic.parent_selection = build_parent_selection()
        genetic.survivor_selection = build_survivor_selection(genetic.population_size)
        genetic.mutation = build_mutation_duplicate()
        genetic.crossover = build_crossover_duplicate()
        genetic.compile()
        return genetic.run()

    def _is_terminate(self, adapters):
        if not adapters:
            return False
        return self._era > self._saturate_limit \
            and len(set(map(lambda x: x.adaptability, adapters[-self._saturate_limit:]))) == 1

    def _perturb_genes(self, individual):
        percentage = abs(self._max_perturbation_rate - (individual.adaptability / 10 * 100 / 3))
        count = math.ceil(percentage / 100 * len(individual.gene))
        indices = np.random.choice(range(len(individual.gene)), count)
        gene = individual.gene[:]
        for index in indices:
            gene[index] = np.random.choice(self._base)
        return gene

    def _evaluate_and_build_individual(self, gene):
        individual = Individual.new(gene, self._era)
        individual.adaptability = self._evaluate(gene)
        return individual

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
            if self._era % 1000 == 0:
                print("era: {}, adaptability: {}".format(self._era, adapter.adaptability))
        return adapters[-1]

    def run(self):
        print("""====================
## start monthly schedule adjusting""")
        print("""### adjusting by ga""")
        ret = self._genetic_wrapper()
        print("""### adjusting by random mutation""")
        ret = self._scheduling(ret)
        adaptability = math.floor(ret.adaptability / 10 * 100)
        print("### adaptability: {}".format(adaptability))
        print("""## finished
====================""")
        return self._gene_to_schedule(ret.gene), adaptability
