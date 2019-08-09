import React from 'react';
import { connect } from 'react-redux';

import CommitActionArea from "../components/CommitActionArea";

import * as actions from "../actions";

const mapStateToProps = (state) => ({
    scheduler: state.scheduler,
    isProgressing: state.ui.isProgressing
});

const mapDispatchToProps = (dispatch) => ({
    save: (scheduler) => dispatch(actions.startUpdateScheduler(scheduler))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);