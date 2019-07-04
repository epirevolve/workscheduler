import React from 'react';
import { connect } from 'react-redux';

import Operator from '../components/Operator';

import { changeSkill, changeRemainPaidHolidays } from '../actions';

const mapStateToProps = (state) => ({
    operator: state.operator
});

const mapDispatchToProps = (dispatch) => ({
    changeSkill: (e) => dispatch(changeSkill(e)),
    changeRemainPaidHoliday: (e) => dispatch(changeRemainPaidHolidays(e.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Operator);