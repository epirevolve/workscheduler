# -*- coding: utf-8 -*-

from statistics import stdev

from eart import Genetic

from mypackages.utils.time import get_time_diff
from mypackages.utils.time import time_to_hour

from .scheduler_helper import build_parent_selection
from .scheduler_helper import build_survivor_selection
from .scheduler_helper import build_mutation
from .scheduler_helper import build_crossover


class SchedulerMonthlyHelper:
    @staticmethod
    def _evaluate_by_require(participants, require, weight):
        count = len(participants)
        ratio = weight / 10
        return weight - min(weight, 0 if count == require else abs(count - require) * ratio)
    
    def _evaluate_by_work_hours(self, gene, weight):
        ratio = weight / 160
        fixed_schedule_times = {x.id: time_to_hour(get_time_diff(x.at_from, x.at_to)) for x in self._fixed_schedules}
        work_category_times = {x.id: time_to_hour(get_time_diff(x.at_from, x.at_to)) for x in self._work_categories}
        work_hours = sum([work_category_times[x] if x in work_category_times else
                          fixed_schedule_times[x] if x in fixed_schedule_times else
                          7.5 if x == 'N' else
                          0 for x in gene])
        return weight - min(weight, abs(work_hours - 160) * ratio)

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
    def _evaluate_by_exclusive_operator(participants, exclusive_operators, weight):
        member_ids = set(map(lambda y: y.id, participants))
        ratio = weight / (len(exclusive_operators) or 1)
        adaptability = sum([ratio for x in exclusive_operators if x.id not in member_ids])
        return weight - adaptability
    
    @staticmethod
    def _evaluate_by_impossible_operator(participants, impossible_operators, weight):
        member_ids = set(map(lambda y: y.id, participants))
        ratio = weight / (len(impossible_operators) or 1)
        adaptability = sum([ratio for x in impossible_operators if x.id in member_ids])
        return weight - adaptability

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
    def _evaluate_by_n_day(schedules):
        n_days = [sum([1 for y in x if y == 'N']) for x in schedules]
        return 6 - min(6, stdev(n_days))
    
    def _evaluate(self):
        pass
    
    def run(self, protobionts: []):
        genetic = Genetic(evaluation=self._evaluate, base_kind=range(len(protobionts)),
                          generation_size=1000, population_size=1000, debug=True)
        genetic.parent_selection = build_parent_selection()
        genetic.survivor_selection = build_survivor_selection(genetic.population_size)
        genetic.mutation = build_mutation()
        genetic.crossover = build_crossover()
        genetic.compile()
        return genetic.run()
