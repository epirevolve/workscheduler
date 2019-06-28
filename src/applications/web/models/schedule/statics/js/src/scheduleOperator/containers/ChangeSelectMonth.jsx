import React from 'react';
import { connect } from 'react-redux';

import { requestSchedules, changeScheduleOf } from '../../common/actions';

import MonthSelect from '../../common/components/MonthSelect';

const dataset = document.querySelector('script[id="baseSchedule"]').dataset;
const team = JSON.parse(dataset.team);

const mapStateToProps = (state) => ({
    team,
    monthYear: state.schedules.scheduleOf
});

const mapDispatchToProps = (dispatch) => ({
    changeMonthYear: (team) => (e) => {
        const scheduleOf = e.toDate().toYearMonthFormatString();
        dispatch(requestSchedules(team, scheduleOf));
        dispatch(changeScheduleOf(scheduleOf));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelect);