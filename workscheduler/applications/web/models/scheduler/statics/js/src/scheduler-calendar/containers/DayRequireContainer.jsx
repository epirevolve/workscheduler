import React from 'react';

import { connect } from 'react-redux';

import { changeRequire } from '../actions';

import DayRequireTable from '../components/DayRequireTable';

const mapStateToProps = (state) => ({
    days: state.monthYearSetting.days,
    categories: state.monthYearSetting.categories
});

const mapDispatchToProps = (dispatch) => ({
    onRequireChange: (day, categoryId) => (require) => dispatch(changeRequire(day, categoryId, require));
});

export default connect(mapStateToProps, mapDispatchToProps)(DayRequireTable);