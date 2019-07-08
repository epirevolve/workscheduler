import React from 'react';
import { connect } from 'react-redux';

import VacationForm from '../components/VacationForm';

import * as actions from '../actions';

const mapStateToProps = (state) => ({
    vacation: state.vacationDialog
});

const mapDispatchToProps = (dispatch) => ({
    changeTitle: (id) => (e) => dispatch(actions.changeTitle(id, e.target.value)),
    changeDaysCount: (id) => (e) => dispatch(actions.changeDaysCount(id, e.target.value)),
    changeStartFrom: (id) => (date) => dispatch(actions.changeStartFrom(id, date)),
    changeEndOn: (id) => (date) => dispatch(actions.changeEndOn(id, date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VacationForm);