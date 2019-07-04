import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import LaunchHistoryList from '../components/LaunchHistoryList';

const mapStateToProps = (state) => ({
    launchHistories: state.controlTower.launchHistories,
});

const mapDispatchToProps = (dispatch) => ({
    fetchLauchHistories: () => dispatch(actions.startFetchLaunchHistories())
});

export default connect(mapStateToProps, mapDispatchToProps)(LaunchHistoryList);