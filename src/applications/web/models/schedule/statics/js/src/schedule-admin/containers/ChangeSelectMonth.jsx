import React from 'react';
import { connect } from 'react-redux';

import { requestSchedules, changeScheduleOf } from '../../schedule/actions';

import MonthSelect from '../../schedule/components/MonthSelect';

const mapStateToProps = (state) => ({
    team: state.teams.team,
    scheduleOf: state.schedules.scheduleOf
});

const mapDispatchToProps = (dispatch) => ({
    onMonthChange: (team, e) => {
        const scheduleOf = e.toDate().toYearMonthFormatString();
        dispatch(requestSchedules(team, scheduleOf));
        dispatch(changeScheduleOf(scheduleOf));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelect);