import React from 'react';
import { connect } from 'react-redux';

import VacationForm from '../components/VacationForm';

import * as actions from '../actions';

const mapStateToProps = (state) => ({
    vacation: state.vacationDialog
});

const mapDispatchToProps = (dispatch) => ({
    changeTitle: (e) => dispatch(actions.changeTitle(e.target.value)),
    changeDaysCount: (e) => dispatch(actions.changeDaysCount(e.target.value)),
    changeStartFrom: (e) => dispatch(actions.changeStartFrom(e.target.value)),
    changeEndOn: (e) => dispatch(actions.changeEndOn(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VacationForm);