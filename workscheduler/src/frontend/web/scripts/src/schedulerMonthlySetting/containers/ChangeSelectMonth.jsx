import React from 'react';
import { connect } from 'react-redux';

import * as apiActions from '../actions/api';

import MonthSelect from '../../common/components/MonthSelect';

import { team } from '../embeddedData';

const mapStateToProps = (state) => ({
    monthYear: `${state.monthlySetting.year}-${state.monthlySetting.month}`
});

const mapDispatchToProps = (dispatch) => ({
    changeMonthYear: (e) => {
        const scheduleOf = e.toDate().toYearMonthFormatString();
        dispatch(apiActions.startFetchMonthlySetting(team, scheduleOf));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelect);