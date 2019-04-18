# -*- coding: utf-8 -*-

import numpy as np

from eart import Genetic

from .scheduler_helper import build_parent_selection
from .scheduler_helper import build_survivor_selection
from .scheduler_helper import build_mutation
from .scheduler_helper import build_crossover


class SchedulerIndividualWorkCategoryMatchHelper:
    def __init__(self, monthly_setting, operators):
        self._monthly_setting = monthly_setting
        self._operators = operators
        self._work_categories = set([y.work_category for x in monthly_setting.days for y in x.details])
        require_sum = map(sum, np.array([[y.require for y in x.details] for x in self._monthly_setting.days]).T)
        self._require_ave = [(x.work_category, y / len(operators))
                             for x, y in zip(self._monthly_setting.days[0].details, require_sum)]
        self._base_kind = list(set([x.id for x in self._work_categories]))
    
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
                if list(gene[i + 1: i + day_offs + 1]) != ['-'] * day_offs:
                    adaptability += ratio * day_offs
                i += day_offs
            elif gene[i] == '-':
                adaptability += ratio
            i += 1
        return weight - min(weight, adaptability)
    
    @staticmethod
    def _evaluate_by_rest_after_day_offs(gene, weight):
        len_gene = len(gene)
        ratio = weight / len_gene
        adaptability = sum([ratio for i, x in enumerate(gene)
                            if x == "-" and i + 1 < len_gene and gene[i + 1] not in ["-", " "]])
        return weight - adaptability
    
    def _evaluate_by_available_max_times(self, gene, weight):
        max_time_work_categories = {x.id: x for x in self._work_categories if x.max_times != 0}
        ratio = weight / len(max_time_work_categories)
        adaptability = sum([ratio for x in max_time_work_categories.values()
                            if len([y for y in gene if y == x.id]) > x.max_times])
        return weight - adaptability
    
    def _evaluate_by_work_category_require_ave(self, gene, weight):
        ratio = weight / sum([x[1] for x in self._require_ave])
        adaptability = 0
        for x, y in self._require_ave:
            adaptability += ratio * abs(len([n for n in gene if n == x.id]) - y)
        return weight - adaptability
    
    def _evaluate(self):
        def _fnc(gene):
            adaptability = 0
            adaptability += self._evaluate_by_day_offs(gene, 10)
            adaptability += self._evaluate_by_rest_after_day_offs(gene, 5)
            adaptability += self._evaluate_by_available_max_times(gene, 7)
            adaptability += self._evaluate_by_work_category_require_ave(gene, 8)
            return adaptability
        
        return _fnc
    
    def _genetic_wrapper(self):
        genetic = Genetic(evaluation=self._evaluate, base_kind=['-'] + self._base_kind,
                          gene_size=len(self._monthly_setting.days), homo_progeny_restriction=True,
                          saturated_limit=20, generation_size=1000, population_size=300, debug=True)
        genetic.parent_selection = build_parent_selection()
        genetic.survivor_selection = build_survivor_selection(genetic.population_size)
        genetic.mutation = build_mutation()
        genetic.crossover = build_crossover()
        genetic.compile()
        return genetic.run()
    
    def run(self):
        compatibles = []
        for _ in range(100):
            compatibles.append(self._genetic_wrapper())
        return compatibles
