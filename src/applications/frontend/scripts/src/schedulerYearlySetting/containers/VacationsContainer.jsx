import React from 'react';
import { connect } from 'react-redux';

import VacationList from '../components/VacationList';

import * as actions from '../actions';

const mapStateToProps = (state) => ({
    vacations: state.yearlySetting.vacations
});

const mapDispatchToProps = (dispatch) => ({
    append: () => dispatch(actions.addVacation()),
    remove: (id) => dispatch(actions.removeVacation(id)),
    changeTitle: (id) => (e) => dispatch(actions.changeVacationTitle(id, e.target.value)),
    changeDate: (id) => (date) => dispatch(actions.changeVacationDate(id, date)),
    changeDays: (id) => (e) => dispatch(actions.changeVacationDays(id, e.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(VacationList);