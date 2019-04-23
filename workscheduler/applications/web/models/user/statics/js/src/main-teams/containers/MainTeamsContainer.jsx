import React from 'react'
import { connect } from 'react-redux'

import MainTeams from '../components/MainTeams';

import { openDialogToAppend } from '../actions';
import { openDialogToEdit } from '../actions';

const mapStateToProps = (state) => ({
    mainTeams: state.mainTeams
});

const mapDispatchToProps = (dispatch) => ({
    handleAppend: () => dispatch(openDialogToAppend()),
    handleEdit: (user) => dispatch(openDialogToEdit(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainTeams);