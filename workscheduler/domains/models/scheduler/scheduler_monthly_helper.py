# -*- coding: utf-8 -*-

from eart.selections import EliteSelection
from eart.selections import TournamentSelection
from eart.mutations import WholeMutation
from eart.mutations import InvertMutation
from eart.mutations import TranslocateMutation
from eart.crossovers import TwoPointCrossover
from eart.crossovers import MultiPointCrossover
from eart.crossovers import UniformityCrossover
from eart import ParentSelection
from eart import SurvivorSelection
from eart import Mutation
from eart import Crossover


def build_parent_selection():
    parent_selection = ParentSelection()
    parent_selection.add(EliteSelection(), 0.05)
    parent_selection.add(TournamentSelection(group_size=3))
    return parent_selection


def build_survivor_selection(population_size):
    survivor_selection = SurvivorSelection(const_population_size=population_size)
    survivor_selection.add(EliteSelection(), 0.05)
    survivor_selection.add(TournamentSelection(group_size=3))
    return survivor_selection


def build_mutation():
    mutation = Mutation(proliferate_mutation=True)
    mutation.add(WholeMutation(), 0.05)
    mutation.add(InvertMutation())
    mutation.add(TranslocateMutation())
    return mutation


def build_crossover():
    crossover = Crossover()
    crossover.add(TwoPointCrossover())
    crossover.add(MultiPointCrossover())
    crossover.add(UniformityCrossover())
    return crossover
