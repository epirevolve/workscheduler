import React from 'react';
import { connect } from 'react-redux';

import VacationList from '../components/VacationList';

import * as actions from '../actions';

const mapStateToProps = (state) => ({
    vacations: state.yearlySetting.vacations
});

const mapDispatchToProps = (dispatch) => ({
    handleAppend: () => dispatch(actions.addVacation()),
    handleRemove: (id) => dispatch(actions.removeVacation(id)),
    onTitleChange: (id) => (e) => dispatch(actions.changeVacationTitle(id, e.target.value)),
    onDateChange: (id) => (date) => dispatch(actions.changeVacationDate(id, date)),
    onDaysChange: (id) => (e) => dispatch(actions.changeVacationDays(id, e.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(VacationList);