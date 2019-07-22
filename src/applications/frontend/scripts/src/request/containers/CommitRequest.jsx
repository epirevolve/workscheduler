import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import CommitActionArea from '../components/CommitActionArea';

import { scheduleRequest } from "../services/scheduleRequest";

const mapStateToProps = (state) => ({
    request: state.requestDialog,
    monthlySetting: state.monthlySetting,
    isAppend: state.ui.isAppend
});

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(actions.closeDialog()),
    remove: (id) => dispatch(actions.startRemoveRequest(id)),
    save: (request, monthlySetting) => dispatch(actions.startUpdateMonthlySetting(scheduleRequest(monthlySetting, request)))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);