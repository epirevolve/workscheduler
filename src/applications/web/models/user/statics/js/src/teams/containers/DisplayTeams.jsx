import React from 'react';
import { connect } from 'react-redux';

import TeamList from '../components/TeamList';

import { openDialogToAppend, openDialogToEdit } from '../actions';

const mapStateToProps = (state) => ({
    teams: state.teams
});

const mapDispatchToProps = (dispatch) => ({
    append: () => dispatch(openDialogToAppend()),
    edit: (user) => dispatch(openDialogToEdit(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);