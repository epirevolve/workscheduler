import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import CommitActionArea from '../components/CommitActionArea';

const mapStateToProps = (state) => ({
    team: state.teamDialog,
    isAppend: state.ui.isAppend,
});

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(actions.closeDialog()),
    remove: (id) => dispatch(actions.startRemoveTeam(id)),
    save: (team, isAppend) => {
        const action = isAppend ? actions.startAppendTeam : actions.startUpdateTeam;
        dispatch(action(team));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);