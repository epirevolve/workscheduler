import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import MonthSelect from '../../common/components/MonthSelect';

import { team } from '../embededData';

const mapStateToProps = (state) => ({
    monthYear: state.monthlySetting.scheduleOf
});

const mapDispatchToProps = (dispatch) => ({
    changeMonthYear: (e) => {
        const scheduleOf = e.toDate().toYearMonthFormatString();
        dispatch(actions.startFetchMonthlySetting(team, scheduleOf));
        dispatch(actions.changeScheduleOf(scheduleOf));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelect);