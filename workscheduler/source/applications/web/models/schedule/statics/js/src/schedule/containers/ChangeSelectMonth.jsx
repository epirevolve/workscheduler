import React from 'react'
import { connect } from 'react-redux'

import { requestSchedules, changeScheduleOf } from '../actions';

import MonthSelect from '../components/MonthSelect';

const dataset = document.querySelector('script[id="base-schedule"]').dataset;
const affiliation = JSON.parse(dataset.affiliation);

const mapStateToProps = (state) => ({
    affiliation,
    scheduleOf: state.schedules.scheduleOf
})

const mapDispatchToProps = (dispatch) => ({
    onMonthChange: (affiliation, e) => {
        const scheduleOf = e.toDate().toYearMonthFormatString();
        dispatch(requestSchedules(affiliation, scheduleOf));
        dispatch(changeScheduleOf(scheduleOf));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelect);