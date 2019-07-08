import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import CommitActionArea from '../components/CommitActionArea';

const mapStateToProps = (state) => ({
    vacation: state.vacationDialog,
    isAppend: state.ui.isAppend,
});

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(actions.closeDialog()),
    remove: (id) => dispatch(actions.startRemoveVacation(id)),
    save: (vacation, isAppend) => {
        const action = isAppend ? actions.startAppendVacation : actions.startUpdateVacation;
        dispatch(action(vacation));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);