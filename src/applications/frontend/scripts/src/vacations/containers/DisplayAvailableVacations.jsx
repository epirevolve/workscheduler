import React from 'react';
import { connect } from 'react-redux';

import VacationList from '../components/VacationList';

import * as actions from '../actions';

const mapStateToProps = (state) => ({
    vacations: state.scheduler.vacations
});

const mapDispatchToProps = (dispatch) => ({
    append: () => dispatch(actions.openDialogToAppend()),
    edit: (vacation) => dispatch(actions.openDialogToUpdate(vacation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VacationList);