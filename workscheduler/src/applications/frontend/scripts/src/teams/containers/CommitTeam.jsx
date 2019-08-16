import React from 'react';
import { connect } from 'react-redux';

import * as pageActions from '../actions/page';
import * as apiActions from '../actions/api';

import CommitActionArea from '../components/CommitActionArea';

const mapStateToProps = (state) => ({
    team: state.teamDialog,
    isAppend: state.ui.isAppend,
});

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(pageActions.closeDialog()),
    remove: (id) => dispatch(apiActions.startRemoveTeam(id)),
    save: (team, isAppend) => {
        const action = isAppend ? apiActions.startAppendTeam : apiActions.startUpdateTeam;
        dispatch(action(team));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);