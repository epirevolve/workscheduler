import React from 'react';
import { connect } from 'react-redux';

import { requestSchedules, changeScheduleOf } from '../actions';

import MonthSelect from '../components/MonthSelect';

const dataset = document.querySelector('script[id="baseSchedule"]').dataset;
const team = JSON.parse(dataset.team);

const mapStateToProps = (state) => ({
    team,
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