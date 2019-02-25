import React from 'react';
import { connect } from 'react-redux';

import DayRequireTable from '../components/DayRequireTable';

import { changeRequire } from '../actions';

const mapStateToProps = (state) => ({
    days: state.monthYearSetting.days,
    categories: state.monthYearSetting.categories
});

const mapDispatchToProps = (dispatch) => ({
    onRequireChange: (day, categoryId) => (require) => dispatch(changeRequire(day, categoryId, require))
});

export default connect(mapStateToProps, mapDispatchToProps)(DayRequireTable);