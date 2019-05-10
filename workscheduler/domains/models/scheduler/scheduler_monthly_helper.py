# -*- coding: utf-8 -*-

"""Contains helper, and evaluation class which make monthly schedule."""
from statistics import stdev
from statistics import mean

import numpy as np

from eart.indivisual import Individual

from mypackages.utils.time import get_time_diff
from mypackages.utils.time import time_to_hour


class SchedulerMonthlyHelperBase:
    """Base class for monthly evaluation.
    
    """
    
    def __init__(self, monthly_setting, operators):
        self._monthly_setting = monthly_setting
        self._operators = operators
        self._work_categories = {y.work_category for x in self._monthly_setting.days for y in x.details}
        self._fixed_schedules = {y for x in self._monthly_setting.days for y in x.fixed_schedules}
    
    def _evaluate_by_require(self, schedules, weight):
        ratio = (weight / (len(schedules[0]) * len(self._monthly_setting.days[0].details))) / 3
        adaptability = 0
        for schedule, day_setting in zip(np.array(schedules).T, self._monthly_setting.days):
            for detail in day_setting.details:
                max_require = detail.work_category.week_day_max if day_setting.day_name not in ['SAT', 'SUN'] \
                    else detail.work_category.holiday_max
                count = len([x for x in schedule if x == detail.work_category.id])
                if count < detail.require:
                    adaptability += ratio * (1.8 ** (detail.require - count))
                elif count > detail.require:
                    adaptability += ratio * (1.5 ** (count - detail.require))
                if count > max_require:
                    adaptability += ratio * (1.1 ** (count - max_require))
        return weight - min(weight, adaptability)
    
    def _evaluate_by_essential_skill(self, schedules, weight):
        ratio = weight / (len(schedules[0]) * len(self._monthly_setting.days[0].details))
        adaptability = 0
        for schedule, day_setting in zip(np.array(schedules).T, self._monthly_setting.days):
            for detail in day_setting.details:
                participants = [self._operators[i] for i, x in enumerate(schedules) if x == detail.work_category.id]
                for skill in detail.work_category.essential_skills:
                    if skill not in [x.skills for x in participants]:
                        adaptability += ratio
        return weight - min(weight, adaptability)
    
    def _evaluate_by_work_hours_std(self, schedules, weight):
        work_category_hour = {x.id: time_to_hour(get_time_diff(x.at_to, x.at_from)) for x in self._work_categories}
        fixed_schedule_hour = {x.id: time_to_hour(get_time_diff(x.at_to, x.at_from)) for x in self._fixed_schedules}
        hours = [sum([work_category_hour[y] if y in work_category_hour else
                      fixed_schedule_hour[y] if y in fixed_schedule_hour else
                      0 for y in x]) for x in schedules]
        return weight - min(weight, stdev(hours) / (mean(hours) or 1))
    
    def _evaluate_by_skill_std(self, schedules, weight):
        adaptability = 0
        transpose = np.array(schedules).T
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
        self._max_perturbation_rate = 25
        
    def _gene_to_schedule(self, gene):
        return [self._schedules[i][x] for i, x in enumerate(gene)]
    
    def _evaluate(self, gene):
        schedules = self._gene_to_schedule(gene)
        adaptability = 0
        adaptability += self._evaluate_by_require(schedules, 7)
        adaptability += self._evaluate_by_essential_skill(schedules, 5)
        adaptability += self._evaluate_by_work_hours_std(schedules, 1)
        adaptability += self._evaluate_by_skill_std(schedules, 2)
        return adaptability
    
    def _evaluate_and_build_individual(self, gene):
        individual = Individual.new(gene, self._era)
        individual.adaptability = self._evaluate(gene)
        return individual
    
    def _perturb_genes(self, individual):
        percentage = self._max_perturbation_rate - (individual.adaptability / 15 * 100 / 4)
        indices = np.random.choice(range(len(individual.gene)), int(percentage / 100 * len(individual.gene)))
        gene = individual.gene[:]
        for index in indices:
            gene[index] = np.random.choice(self._base)
        return gene

    def _is_terminate(self, adapters):
        if not adapters:
            return False
        return self._era > 300 \
            and len(set(map(lambda x: x.adaptability, adapters[-300:]))) == 1
    
    def _scheduling(self):
        protobionts = [[np.random.choice(self._base) for _ in range(len(self._schedules))]
                       for _ in range(len(self._schedules[0]))]
        individuals = [self._evaluate_and_build_individual(x) for x in protobionts]
        adapters = []
        while not self._is_terminate(adapters):
            perturbed_gebe = [self._perturb_genes(x) for x in individuals]
            individuals = individuals + [self._evaluate_and_build_individual(x) for x in perturbed_gebe]
            individuals = sorted(individuals, key=lambda x: x.adaptability, reverse=True)
            individuals = individuals[:1000]
            adapter = individuals[0]
            adapters.append(adapter)
            self._era += 1
        return adapters[-1]
    
    def run(self):
        print("""====================
## start monthly schedule adjusting""")
        ret = self._scheduling()
        print("last adaptability: {}".format(ret.adaptability))
        print("""## finished
====================""")
        return self._gene_to_schedule(ret.gene)
