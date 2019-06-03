import React from 'react';
import { connect } from 'react-redux';

import { requestSchedules, changeScheduleOf } from '../../schedule/actions';

import MonthSelect from '../../schedule/components/MonthSelect';

const mapStateToProps = (state) => ({
    affiliation: state.affiliations.affiliation,
    scheduleOf: state.schedules.scheduleOf
});

const mapDispatchToProps = (dispatch) => ({
    onMonthChange: (affiliation, e) => {
        const scheduleOf = e.toDate().toYearMonthFormatString();
        dispatch(requestSchedules(affiliation, scheduleOf));
        dispatch(changeScheduleOf(scheduleOf));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelect);