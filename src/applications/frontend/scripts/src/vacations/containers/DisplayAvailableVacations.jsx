import React from 'react';
import { connect } from 'react-redux';

import VacationList from '../components/VacationList';

import * as actions from '../actions';

const mapStateToProps = (state) => ({
    vacations: state.vacations
});

const mapDispatchToProps = (dispatch) => ({
    append: () => dispatch(actions.openDialogToAppend()),
    edit: (vacation) => dispatch(actions.openDialogToUpdate(vacation)),
    remove: (id) => dispatch(actions.removeVacation(id)),
    changeTitle: (id) => (e) => dispatch(actions.changeTitle(id, e.target.value)),
    changeStartFrom: (id) => (date) => dispatch(actions.changeStartFrom(id, date)),
    changeEndOn: (id) => (date) => dispatch(actions.changeEndOn(id, date)),
    changeDaysCount: (id) => (e) => dispatch(actions.changeDaysCount(id, e.target.value)),
    changeParticipantsCount: (id) => (e) => dispatch(actions.changeParticipantsCount(id, e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VacationList);