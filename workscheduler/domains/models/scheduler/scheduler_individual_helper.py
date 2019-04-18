# -*- coding: utf-8 -*-

from itertools import groupby
from itertools import chain
from multiprocessing import Pool
import multiprocessing as multi

from eart import Genetic

from .scheduler_helper import build_parent_selection
from .scheduler_helper import build_survivor_selection
from .scheduler_helper import build_mutation
from .scheduler_helper import build_crossover


class SchedulerIndividualHelper:
    def __init__(self, monthly_setting, operators):
        self._monthly_setting = monthly_setting
        self._operators = operators
        self._daily_requests = [[y.operator.id for y in x.requests] for x in self._monthly_setting.days]
        self._daily_fixed_schedules = [{y.id: [z.id for z in y.participants] for y in x.fixed_schedules}
                                       for x in self._monthly_setting.days]
        self._common_gene = []

    def _evaluate_by_request(self, gene, operator, weight):
        ratio = weight / len(gene)
        adaptability = sum([ratio for x, y in zip(gene, self._daily_requests) if operator.id in y and x != ' '])
        return weight - adaptability
        
    def _evaluate_by_fixed_schedule(self, gene, operator, weight):
        ratio = weight / len(gene)
        adaptability = 0
        for x, y in zip(gene, self._daily_fixed_schedules):
            fixed_schedule_participant_ids = list(chain.from_iterable(y.values()))
            if operator.id in fixed_schedule_participant_ids and x != 'B':
                adaptability += ratio
            if operator.id not in fixed_schedule_participant_ids and x == 'B':
                adaptability += ratio
        return weight - adaptability

    def _evaluate_by_holiday(self, gene, weight):
        ratio = weight / self._monthly_setting.holidays
        holidays = len([x for x in gene if x == ' '])
        return weight - min(weight, abs(self._monthly_setting.holidays - holidays) * ratio)

    @staticmethod
    def _evaluate_by_continuous_attendance(gene, weight):
        ratio = weight / len(gene)
        continuous_attendance = [sum(1 for _ in z) for y, z in groupby(gene, key=lambda x: x == ' ') if not y]
        adaptability = sum([ratio * x for x in continuous_attendance if x > 5])
        return weight - min(weight, adaptability)
    
    @staticmethod
    def _evaluate_by_holiday_continuity(gene, weight):
        continuous_holiday = [sum(1 for _ in z) for y, z in groupby(gene, key=lambda x: x == ' ') if y]
        ratio = weight / sum(continuous_holiday)
        adaptability = ratio * (abs((sum(continuous_holiday) * 2 / 3) - len(continuous_holiday))
                                + len([x for x in continuous_holiday if x > 2]))
        return weight - adaptability
    
    def _evaluate(self, operator):
        def _fnc(gene):
            adaptability = 0
            adaptability += self._evaluate_by_request(gene, operator, 10)
            adaptability += self._evaluate_by_fixed_schedule(gene, operator, 10)
            adaptability += self._evaluate_by_holiday(gene, 5)
            adaptability += self._evaluate_by_continuous_attendance(gene, 5)
            adaptability += self._evaluate_by_holiday_continuity(gene, 3)
            return adaptability
        return _fnc
    
    def _has_request_or_fixed_schedule(self, operator):
        return operator.id in [y for x in self._daily_requests for y in x]\
               or operator.id in list(set([z for x in self._daily_fixed_schedules for y in x.values() for z in y]))

    def _genetic_wrapper(self, operator):
        genetic = Genetic(evaluation=self._evaluate(operator), base_kind=[' ', 'A', 'B'],
                          gene_size=len(self._monthly_setting.days), homo_progeny_restriction=True,
                          saturated_limit=20, generation_size=1000, population_size=300, debug=True)
        genetic.parent_selection = build_parent_selection()
        genetic.survivor_selection = build_survivor_selection(genetic.population_size)
        genetic.mutation = build_mutation()
        genetic.crossover = build_crossover()
        genetic.compile()
        return genetic.run()
    
    def _batch_genetic_wrapper(self, operator):
        with Pool(multi.cpu_count()) as p:
            batch = p.map(self._genetic_wrapper, [operator for _ in range(200)])
        return batch
    
    def run(self):
        compatibles = []
        for x in self._operators:
            if self._has_request_or_fixed_schedule(x):
                compatibles.append(self._batch_genetic_wrapper(x))
            else:
                if not self._common_gene:
                    self._common_gene = self._batch_genetic_wrapper(x)
                compatibles.append(self._common_gene[:])
        return compatibles
