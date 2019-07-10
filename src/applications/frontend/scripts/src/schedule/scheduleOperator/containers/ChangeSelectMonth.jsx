import React from 'react';
import { connect } from 'react-redux';

import { startFetchSchedules, changeScheduleOf } from '../../common/actions';

import MonthSelect from 'MonthSelect';

import { team } from "../../common/embedData";

const mapStateToProps = (state) => ({
    monthYear: state.schedules.scheduleOf
});

const mapDispatchToProps = (dispatch) => ({
    changeMonthYear: (e) => {
        const scheduleOf = e.toDate().toYearMonthFormatString();
        dispatch(startFetchSchedules(team, scheduleOf));
        dispatch(changeScheduleOf(scheduleOf));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelect);