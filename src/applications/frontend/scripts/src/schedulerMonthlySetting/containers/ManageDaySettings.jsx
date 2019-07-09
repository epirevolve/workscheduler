import React from 'react';
import { connect } from 'react-redux';

import DayTable from '../components/DayTable';

import * as actions from '../actions';

const mapStateToProps = (state) => ({
    days: state.monthlySetting.days
});

const mapDispatchToProps = (dispatch) => ({
    changeRequire: (day, categoryId) => (e) => dispatch(actions.changeRequire(day, categoryId, e.target.value)),
    changeIsHoliday: (day) => (e) => dispatch(actions.changeIsHoliday(day, e.target.checked))
});

export default connect(mapStateToProps, mapDispatchToProps)(DayTable);