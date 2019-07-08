import React from 'react';
import { connect } from 'react-redux';

import TeamList from '../components/TeamList';

import * as actions from '../actions';

const mapStateToProps = (state) => ({
    teams: state.teams
});

const mapDispatchToProps = (dispatch) => ({
    append: () => dispatch(actions.openDialogToAppend()),
    edit: (user) => dispatch(actions.openDialogToUpdate(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);