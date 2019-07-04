import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import CommitActionArea from '../components/CommitActionArea';

const mapStateToProps = (state) => ({
    skill: state.skillDialog,
    isAppend: state.ui.isAppend,
});

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(actions.closeDialog()),
    remove: (id) => dispatch(actions.startRemoveSkill(id)),
    save: (skill, isAppend) => {
        const action = isAppend ? actions.startAppendSkill : actions.startUpdateSkill;
        dispatch(action(skill));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);