# -*- coding: utf-8 -*-

from calendar import (
    Calendar, SUNDAY, day_abbr
)
from collections import namedtuple
from datetime import (
    datetime, date
)
from flask import (
    Blueprint, render_template, jsonify,
    request, url_for
)
from flask_login import login_required
from workscheduler.applications.services import (
    BelongQuery, ScheduleQuery, SkillQuery,
    OperatorQuery
)
from ..adapters import ScheduleCommandAdapter
from ..forms import (
    SchedulerOptionForm, SchedulerDateSettingForm
)
from ..util import get_next_month
from .. import get_db_session
from . import admin_required


bp = Blueprint('schedules', __name__)


@bp.route('/schedules')
@login_required
def show_schedules():
    return render_template('schedules.html')

