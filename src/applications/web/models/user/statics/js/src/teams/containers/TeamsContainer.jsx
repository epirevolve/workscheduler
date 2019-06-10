import React from 'react';
import { connect } from 'react-redux';

import Teams from '../components/Teams';

import { openDialogToAppend, openDialogToEdit } from '../actions';

const mapStateToProps = (state) => ({
    teams: state.teams
});

const mapDispatchToProps = (dispatch) => ({
    handleAppend: () => dispatch(openDialogToAppend()),
    handleEdit: (user) => dispatch(openDialogToEdit(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Teams);