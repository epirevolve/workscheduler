import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import CommitActionAreaFixedSchedule from '../components/CommitActionAreaFixedSchedule';

const mapStateToProps = (state) => ({
    fixedSchedule: state.fixedScheduleDialog,
    isAppend: state.ui.isAppend,
});

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(actions.closeDialog()),
    remove: (id) => dispatch(actions.removeFixedSchedule(id)),
    save: (fixedSchedule, isAppend) => {
        const action = isAppend ? actions.appendFixedSchedule : actions.updateFixedSchedule;
        dispatch(action(fixedSchedule));
        dispatch(actions.closeDialog());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionAreaFixedSchedule);