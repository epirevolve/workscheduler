# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import (
    StringField, HiddenField, BooleanField,
    SelectField
)
from wtforms.validators import (
    DataRequired, Length
)
from workscheduler.applications.services import AffiliationQuery
from workscheduler.domains.models.user import User
from workscheduler.applications.web import get_db_session


class UsersForm(FlaskForm):
    
    id = HiddenField()
    login_id = StringField(validators=[DataRequired(), Length(max=User.login_id.type.length)])
    name = StringField(validators=[DataRequired(), Length(max=User.name.type.length)])
    affiliation = SelectField('Affiliation')
    is_admin = BooleanField()
    is_operator = BooleanField()
    
    def __init__(self, *args, **kwargs):
        super(UsersForm, self).__init__(*args, **kwargs)
        
        affiliations = AffiliationQuery(get_db_session()).get_affiliations()
        self.affiliation.choices = [(b.id, b.name) for b in affiliations]
