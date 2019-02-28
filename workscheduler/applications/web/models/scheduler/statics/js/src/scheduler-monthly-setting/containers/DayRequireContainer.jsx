import React from 'react';
import { connect } from 'react-redux';

import DayRequireTable from '../components/DayRequireTable';

import { changeRequire } from '../actions';

const mapStateToProps = (state) => ({
    days: state.monthlySetting.days
});

const mapDispatchToProps = (dispatch) => ({
    onRequireChange: (day, categoryId) => (e) => dispatch(changeRequire(day, categoryId, e.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(DayRequireTable);