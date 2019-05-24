import React from 'react'
import { connect } from 'react-redux'

import requestAgent from 'superagent';

import { requestSchedules } from '../../schedule/actions';
import { changeScheduleOf } from '../actions';

import MonthSelect from '../components/MonthSelect';

const mapStateToProps = (state) => ({
    affiliation: state.schedules.affiliation,
    scheduleOf: state.schedules.scheduleOf
})

const mapDispatchToProps = (dispatch) => ({
    onMonthChange: (affiliation, e) => {
        const scheduleOf = e.toDate().toYearMonthFormatString();
        dispatch(requestSchedules());
        changeScheduleOf(affiliation, scheduleOf)
            .then(action => dispatch(action))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelect);