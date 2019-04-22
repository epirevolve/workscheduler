# -*- coding: utf-8 -*-

"""Contains helper class which make monthly schedule."""
from statistics import stdev

import numpy as np

from eart import Genetic

from mypackages.utils.time import get_time_diff
from mypackages.utils.time import time_to_hour

from .scheduler_helper import build_parent_selection
from .scheduler_helper import build_survivor_selection
from .scheduler_helper import build_mutation
from .scheduler_helper import build_crossover


class SchedulerMonthlyHelper:
    """Helper class for adjustment all operators schedule.
    
    This helper adjustment all operator's schedules by considering daily require number,
    skill level, and work hour average.
    
    """
    
    def __init__(self, monthly_setting, schedules):
        self._monthly_setting = monthly_setting
        self._schedules = schedules
        self._work_categories = {y.work_category for x in self._monthly_setting.days for y in x.details}
        self._fixed_schedules = {y for x in self._monthly_setting.days for y in x.fixed_schedules}
    
    def _evaluate_by_require(self, schedules, weight):
        transpose = np.array(schedules.values()).T
        ratio = weight / len(transpose)
        adaptability = 0
        for schedule, day_setting in zip(transpose, self._monthly_setting.days):
            for detail in day_setting.details:
                max_require = detail.work_category.week_day_max if day_setting.day_name in ['SAT', 'SUN'] \
                    else detail.work_category.holiday_max
                count = len([x for x in schedule if x == detail.work_category.id])
                if count <= detail.require or count >= max_require:
                    adaptability += ratio * abs(count - detail.require)
        return weight - min(weight, adaptability)
    
    def _evaluate_by_essential_skill(self, schedules, weight):
        transpose = np.array(schedules.values()).T
        ratio = weight / len(transpose)
        adaptability = 0
        for schedule, day_setting in zip(transpose, self._monthly_setting):
            for detail in day_setting.details:
                participants = [schedules.keys()[i] for i, x in enumerate(schedules) if x == detail.work_category.id]
                for skill in detail.essential_skills:
                    if skill not in [x.skills for x in participants]:
                        adaptability += ratio
        return weight - min(weight, adaptability)
    
    def _evaluate_by_work_hours_std(self, schedules, weight):
        work_category_hour = {x.id: time_to_hour(get_time_diff(x.at_to, x.at_from)) for x in self._work_categories}
        fixed_schedule_hour = {x.id: time_to_hour(get_time_diff(x.at_to, x.at_from)) for x in self._fixed_schedules}
        hours = [sum([work_category_hour[y] if y in work_category_hour else
                      fixed_schedule_hour[y] if y in fixed_schedule_hour else
                      0 for y in x]) for x in schedules.values()]
        return weight - min(weight, stdev(hours))

    @staticmethod
    def _evaluate_by_n_day_std(schedules):
        n_days = [sum([1 for y in x if y == 'N']) for x in schedules]
        return 6 - min(6, stdev(n_days))
    
    def _gene_to_schedule(self, gene):
        return {y: z for i, x in enumerate(gene) for y, z in self._schedules[i][x]}
    
    def _evaluate(self, gene):
        schedules = self._gene_to_schedule(gene)
        adaptability = 0
        adaptability += self._evaluate_by_require(schedules, 10)
        adaptability += self._evaluate_by_essential_skill(schedules, 8)
        adaptability += self._evaluate_by_work_hours_std(schedules, 8)
        return adaptability
    
    def run(self):
        genetic = Genetic(evaluation=self._evaluate, base_kind=range(len(self._schedules.values()[0])),
                          generation_size=1000, population_size=1000)
        genetic.parent_selection = build_parent_selection()
        genetic.survivor_selection = build_survivor_selection(genetic.population_size)
        genetic.mutation = build_mutation()
        genetic.crossover = build_crossover()
        genetic.compile()
        return genetic.run()
