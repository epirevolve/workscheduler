import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import CommitActionArea from '../components/CommitActionArea';

const mapStateToProps = (state) => ({
    schedules: state.schedules.schedules,
    isPublished: state.schedules.isPublished,
    isProgressing: state.ui.isProgressing
});

const mapDispatchToProps = (dispatch) => ({
    onSaveSchedules: (schedules) => dispatch(actions.startSaveSchedules(schedules)),
    onWithdrawSchedules: (schedules) => dispatch(actions.startWithdrawSchedules(schedules)),
    onPublishSchedules: (schedules) => dispatch(actions.startPublishSchedules(schedules)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);