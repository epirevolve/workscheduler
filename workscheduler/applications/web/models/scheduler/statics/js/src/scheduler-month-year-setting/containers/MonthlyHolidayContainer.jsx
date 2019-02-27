import React from 'react';
import { connect } from 'react-redux';

import { changeMonthlyHoliday } from '../actions';

import MonthlyHoliday from '../components/MonthlyHoliday';

const mapStateToProps = (state) => ({
    holidays: state.monthYearSetting.holidays
});

const mapDispatchToProps = (dispatch) => ({
    onChange: (e) => dispatch(changeMonthlyHoliday(e.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyHoliday);