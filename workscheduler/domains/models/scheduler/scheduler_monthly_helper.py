# -*- coding: utf-8 -*-

"""Contains helper, and evaluation class which make monthly schedule."""
from statistics import stdev
from statistics import mean

import numpy as np

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
        self._work_categories = {y.work_category for x in self._monthly_setting.days for y in x.details}
        self._fixed_schedules = {y for x in self._monthly_setting.days for y in x.fixed_schedules}
    
    def _evaluate_by_require(self, schedules, weight):
        ratio = (weight / (len(schedules[0]) * len(self._monthly_setting.days[0].details))) * 0.3
        adaptability = 0
        for schedule, day_setting in zip(np.array(schedules).T, self._monthly_setting.days):
            for detail in day_setting.details:
                max_require = detail.work_category.week_day_max if day_setting.day_name not in ['SAT', 'SUN'] \
                    else detail.work_category.holiday_max
                count = len([x for x in schedule if x == detail.work_category.id])
                if count < detail.require:
                    adaptability += ratio * (detail.require - count) * 5
                elif count > max_require:
                    adaptability += ratio * (count - max_require) * 2
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
    
    def _genetic_wrapper(self):
        genetic = Genetic(evaluation=self._evaluate, base_kind=range(len(self._schedules[0])),
                          gene_size=len(self._schedules), generation_size=1000, population_size=500,
                          saturated_limit=20)
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
        print("""## finished
====================""")
        return self._gene_to_schedule(ret.gene)
