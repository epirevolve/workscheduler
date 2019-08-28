import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import CommitActionArea from '../components/CommitActionArea';

import { formatVacationOnScheduler } from "../services/formatScheduler";

const mapStateToProps = (state) => ({
    scheduler: state.scheduler,
    vacation: state.vacationDialog,
    isAppend: state.ui.isAppend,
});

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(actions.closeDialog()),
    remove: (id) => dispatch(actions.startRemoveVacation(id)),
    save: (scheduler, vacation, isAppend) => dispatch(actions.startUpdateScheduler(formatVacationOnScheduler(scheduler, vacation, isAppend)))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);