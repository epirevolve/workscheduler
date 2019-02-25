import React from 'react';

import { connect } from 'react-redux';

import { changeMonthlyHoliday } from '..actions';

import MonthlyHoliday from '../components/MonthlyHoliday';

const mapStateToProps = (state) => ({
    holidays: state.monthYearSetting.holidays
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyHoliday);