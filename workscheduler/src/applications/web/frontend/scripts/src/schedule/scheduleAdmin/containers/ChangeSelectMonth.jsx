import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../common/actions';

import MonthSelect from 'MonthSelect';

const mapStateToProps = (state) => ({
    team: state.teams.team,
    monthYear: state.schedules.scheduleOf
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeMonthYear: (e) => {
        const scheduleOf = e.toDate().toYearMonthFormatString();
        dispatch(actions.startFetchSchedules(ownProps.team, scheduleOf));
        dispatch(actions.changeScheduleOf(scheduleOf));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelect);