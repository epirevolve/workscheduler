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
    save: (schedules) => dispatch(actions.startSaveSchedules(schedules)),
    withdraw: (schedules) => dispatch(actions.startWithdrawSchedules(schedules)),
    publish: (schedules) => dispatch(actions.startPublishSchedules(schedules)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);