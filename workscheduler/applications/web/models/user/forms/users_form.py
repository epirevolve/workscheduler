# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms import HiddenField
from wtforms import BooleanField
from wtforms import SelectField
from wtforms.validators import DataRequired
from wtforms.validators import Length

from workscheduler.applications.services import AffiliationQuery
from workscheduler.applications.web import get_db_session
from workscheduler.domains.models.user import User


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
