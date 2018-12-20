# -*- coding: utf-8 -*-

from workscheduler.domains.models.operator import Skill


class SkillQuery:
    def __init__(self, session):
        self._session = session
    
    def get_skills(self):
        return self._session.query(Skill).order_by(Skill.id).all()
    
    def get_certified_skills(self):
        return self._session.query(Skill).filter(Skill.is_certified)\
            .order_by(Skill.id).all()
    
    def get_not_certified_skills(self):
        return self._session.query(Skill).filter(not Skill.is_certified)\
            .order_by(Skill.id).all()
