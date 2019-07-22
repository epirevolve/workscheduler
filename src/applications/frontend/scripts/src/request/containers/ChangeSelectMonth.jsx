import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import MonthSelect from '../../common/components/MonthSelect';

import { currentUser } from '../embeddedData';

const mapStateToProps = (state) => ({
    monthYear: `${state.calendar.year}-${state.calendar.month}`
});

const mapDispatchToProps = (dispatch) => ({
    changeMonthYear: (e) => {
        const scheduleOf = e.toDate().toYearMonthFormatString();
        dispatch(actions.startFetchCalendar(currentUser.team, scheduleOf));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelect);