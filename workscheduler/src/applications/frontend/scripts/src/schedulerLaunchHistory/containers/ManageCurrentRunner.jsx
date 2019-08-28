import React from 'react';
import { connect } from 'react-redux';

import CurrentRunnerList from '../components/CurrentRunnerList';

import * as actions from '../actions';

const mapStateToProps = (state) => ({
    currentRunners: state.controlTower.currentRunners,
});

const mapDispatchToProps = (dispatch) => ({
    fetchCurrenRunners: () => dispatch(actions.startFetchCurrentRunners()),
    teminateRunner: (teamId) => dispatch(actions.startTerminateScheduler(teamId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentRunnerList);