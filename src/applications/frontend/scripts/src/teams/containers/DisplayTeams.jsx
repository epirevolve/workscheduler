import React from 'react';
import { connect } from 'react-redux';

import TeamList from '../components/TeamList';

import { openDialogToAppend, openDialogToUpdate } from '../actions';

const mapStateToProps = (state) => ({
    teams: state.teams
});

const mapDispatchToProps = (dispatch) => ({
    append: () => dispatch(openDialogToAppend()),
    edit: (user) => dispatch(openDialogToUpdate(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);