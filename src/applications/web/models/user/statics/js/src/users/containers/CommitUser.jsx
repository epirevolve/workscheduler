import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import CommitActionArea from '../components/CommitActionArea';

const mapStateToProps = (state) => ({
    user: state.userDialog,
    isAppend: state.ui.isAppend,
});

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(actions.closeDialog()),
    activate: (id) => dispatch(actions.startActivateUser(id)),
    inactivate: (id) => dispatch(actions.startInactivateUser(id)),
    resetPassword: (id) => dispatch(actions.startResetPassword(id)),
    save: (user, isAppend) => {
        const strategy = isAppend ? actions.startAppendUser : actions.startUpdateUser;
        dispatch(strategy(user));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);