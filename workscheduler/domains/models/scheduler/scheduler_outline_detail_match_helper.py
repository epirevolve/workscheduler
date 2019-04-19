# -*- coding: utf-8 -*-

"""Contains helper class of matching outlines and details."""
import numpy as np

from .scheduler_outline_helper import work_day_sign
from .scheduler_outline_helper import holiday_sign
from .scheduler_detail_helper import day_off_sign


class SchedulerOutlineDetailMatchHelper:
    """Helper class for matching outline and factor.
    
    This helper adapt factor - detail work schedule category - to outline
    which requires detail work schedule category only. Evaluation of
    consistency rate is evaluated by day off continuity and holiday after day off.
    Except not property outlines for operator like not adapted requests or
    not saved time for fixed schedule.
    
    """
    
    def __init__(self, outlines, details):
        self._all_outlines = outlines
        self._all_details = details
    
    @staticmethod
    def _combine_outline_detail(outline_gene, detail_gene):
        return [detail_gene.pop(0) if x == work_day_sign else x for x in outline_gene]
    
    @staticmethod
    def _evaluate_by_rest_after_day_off(gene):
        len_gene = len(gene)
        return len([x for i, x in enumerate(gene)
                    if x == day_off_sign and i+1 < len_gene and gene[i+1] != holiday_sign]) == 0
        
    def run(self):
        compatibles = []
        for outlines, details in zip(self._all_outlines, self._all_details):
            combinations = []
            while True:
                outline = np.random.choice(outlines)
                detail = np.random.choice(details)
                combination = self._combine_outline_detail(outline.gene[:], detail.gene[:])
                if self._evaluate_by_rest_after_day_off(combination):
                    combinations.append(combination)
                if len(combinations) > 1000:
                    break
            compatibles.append(combinations)
        return compatibles
