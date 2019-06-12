import React from 'react';
import { connect } from 'react-redux';

import { startSaveSchedules } from '../actions';

import CommitActionArea from '../components/CommitActionArea';

const mapStateToProps = (state) => ({
    schedules: state.schedules.schedules,
    isPublished: state.isPublished,
    isProgressing: false
});

const mapDispatchToProps = (dispatch) => ({
    onSaveSchedules: (schedules) => {
        dispatch(startSaveSchedules(schedules));
    },
    onPublicSchedules: () => {},
    onTerminateSchedules: () => {}
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);