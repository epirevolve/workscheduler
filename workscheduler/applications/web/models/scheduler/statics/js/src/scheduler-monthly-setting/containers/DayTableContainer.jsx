import React from 'react';
import { connect } from 'react-redux';

import DayTable from '../components/DayTable';

import { changeRequire } from '../actions';
import { changeIsHoliday } from '../actions';

const mapStateToProps = (state) => ({
    days: state.monthlySetting.days
});

const mapDispatchToProps = (dispatch) => ({
    onRequireChange: (day, categoryId) => (e) => dispatch(changeRequire(day, categoryId, e.target.value)),
    onIsHolidayChange: (day) => (e) => dispatch(changeIsHoliday(day, e.target.checked))
});

export default connect(mapStateToProps, mapDispatchToProps)(DayTable);