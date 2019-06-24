import React from 'react';
import { connect } from 'react-redux';

import LaunchHistoryList from '../components/LaunchHistoryList';

const mapStateToProps = (state) => ({
    launchHistories: state.launchHistories,
});

export default connect(mapStateToProps)(LaunchHistoryList);