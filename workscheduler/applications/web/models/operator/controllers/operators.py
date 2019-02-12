# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import redirect
from flask import url_for
from flask import render_template
from flask import flash
from flask_login import login_required

from workscheduler.applications.services import OperatorQuery
from workscheduler.applications.services import SkillQuery
from workscheduler.applications.web.util.functions.controller import admin_required
from workscheduler.applications.web import get_db_session
from ..adapters import OperatorCommandAdapter
from ..forms import OperatorForm
from ..forms import OperatorsForm

bp = Blueprint('operators', __name__, template_folder="../views", static_folder="../statics")


@bp.route('/myself/<operator_id>')
@login_required
def show_myself(operator_id):
    operator = OperatorQuery(get_db_session()).get_operator(operator_id)
    return render_template('operator.html', form=OperatorForm(obj=operator))


@bp.route('/myself/<operator_id>', methods=['POST'])
@login_required
def update_myself(operator_id):
    session = get_db_session()
    OperatorCommandAdapter(session).update_myself(OperatorForm())
    session.commit()

    flash('Operator info was successfully registered.')
    
    return redirect(url_for('operators.show_myself', operator_id=operator_id))


@bp.route('/')
@login_required
@admin_required
def show_operators():
    session = get_db_session()
    operators = OperatorQuery(session).get_operators()
    skills = SkillQuery(session).get_not_certified_skills()
    return render_template('operators.html', form=OperatorsForm(),
                           operators=operators, skills=skills)


@bp.route('/<operator_id>', methods=['POST'])
@login_required
@admin_required
def update_operator(operator_id):
    pass
