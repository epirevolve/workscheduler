import React from 'react';
import { connect } from 'react-redux';

import CurrentRunnerList from '../components/CurrentRunnerList';

import * as actions from '../actions';

const mapStateToProps = (state) => ({
    currentRunners: state.currentRunners,
});

const mapDispatchToProps = (dispatch) => ({
    handleTeminateRunner: (team, month, year) => dispatch(actions.startPublicMonthlySetting(team, month, year))
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentRunnerList);