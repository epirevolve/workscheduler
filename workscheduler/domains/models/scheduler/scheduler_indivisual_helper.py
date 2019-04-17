# -*- coding: utf-8 -*-

from itertools import groupby

from eart import Genetic

from .scheduler_monthly_helper import build_parent_selection
from .scheduler_monthly_helper import build_survivor_selection
from .scheduler_monthly_helper import build_mutation
from .scheduler_monthly_helper import build_crossover


class SchedulerIndividualHelper:
    def __init__(self, monthly_setting):
        self._monthly_setting = monthly_setting
        self._work_categories = set([y.work_category for x in monthly_setting.days for y in x.details])
        self._base_kind = list(map(lambda x: x.id, self._work_categories)) \
            + list(map(lambda x: x.id, monthly_setting.fixed_schedules))
        self._requests = [[y.operator.id for y in x.requests] for x in self._monthly_setting.days]
        self._fixed_schedules = [{y.id: [z.id for z in y.participants] for y in x.fixed_schedules}
                                 for x in self._monthly_setting.days]

    def _evaluate_by_request(self, gene, operator, weight):
        ratio = weight / len(gene)
        adaptability = sum([ratio for x, y in zip(gene, self._requests) if operator.id in y and x != ' '])
        return weight - adaptability
        
    def _evaluate_by_fixed_schedule(self, gene, operator, weight):
        ratio = weight / len(gene)
        adaptability = sum([ratio for x, y in zip(gene, self._fixed_schedules)
                            for k, v in y.values() if operator.id in v and x != k])
        return weight - adaptability

    def _evaluate_by_holiday(self, gene, weight):
        ratio = weight / self._monthly_setting.holidays
        holidays = len([x for x in gene if x == ' '])
        return weight - min(weight, abs(self._monthly_setting.holidays - holidays) * ratio)

    @staticmethod
    def _evaluate_by_continuous_attendance(gene, weight):
        ratio = weight / len(gene)
        continuous_attendance = [[sum(1 for _ in y) for z, y in groupby(x, key=lambda z: z == ' ') if not z]
                                 for x in gene]
        adaptability = sum([ratio for x in continuous_attendance for y in x if y > 5])
        return weight - min(weight, adaptability)
    
    def _evaluate_by_day_offs(self, gene, weight):
        adaptability = 0
        ratio = weight / len(gene)
        day_offs_work_categories = {x.id: x for x in self._work_categories if x.day_offs != 0}
        i = 0
        len_x = len(gene)
        while i < len_x:
            if gene[i] in day_offs_work_categories:
                day_offs = day_offs_work_categories[gene[i]].day_offs
                if i + day_offs >= len_x:
                    day_offs = len_x - i - 1
                if list(gene[i+1: i+day_offs+1]) != ['-'] * day_offs:
                    adaptability += ratio * day_offs
                i += day_offs
            elif gene[i] == '-':
                adaptability += ratio
            i += 1
        return weight - min(weight, adaptability)

    @staticmethod
    def _evaluate_by_rest(schedule):
        pass

    @staticmethod
    def _evaluate_by_available_max_times(schedules):
        pass
    
    def _evaluate(self, operator):
        def _fnc(gene):
            adaptability = 0
            adaptability += self._evaluate_by_request(gene, operator, 10)
            adaptability += self._evaluate_by_fixed_schedule(gene, operator, 10)
            adaptability += self._evaluate_by_holiday(gene, 10)
            adaptability += self._evaluate_by_continuous_attendance(gene, 10)
            adaptability += self._evaluate_by_day_offs(gene, 10)
            return adaptability
        return _fnc
    
    def run(self, operator):
        genetic = Genetic(evaluation=self._evaluate(operator), base_kind=[' ', 'N', '-'] + self._base_kind,
                          gene_size=len(self._monthly_setting.days),
                          generation_size=1000, population_size=50000, debug=True)
        genetic.parent_selection = build_parent_selection()
        genetic.survivor_selection = build_survivor_selection(genetic.population_size)
        genetic.mutation = build_mutation()
        genetic.crossover = build_crossover()
        genetic.compile()
        genetic.run()
        compatibles = genetic.get_compatibles(1000)
        return compatibles
