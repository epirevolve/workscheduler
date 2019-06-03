import React from 'react';
import { connect } from 'react-redux';

import { saveSchedules } from '../actions';

import PublishState from '../components/PublishState';

const mapStateToProps = (state) => ({
    schedules: state.schedules,
    isPublished: state.isPublished
})

const mapDispatchToProps = (dispatch) => ({
    onSaveSchedules: (schedules) => {
        dispatch(saveSchedules(schedules));
    },
    onPublicSchedule: () => {},
    onTerminateSchedule: () => {}
})

export default connect(mapStateToProps, mapDispatchToProps)(PublishState);