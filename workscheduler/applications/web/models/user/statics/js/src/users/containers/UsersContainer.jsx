import React from 'react'
import { connect } from 'react-redux'

import Users from '../components/Users';

import { openDialogToAppend } from '../actions';
import { openDialogToEdit } from '../actions';

const mapStateToProps = (state) => ({
    users: state.users
});

const mapDispatchToProps = (dispatch) => ({
    handleAppend: () => dispatch(openDialogToAppend()),
    handleEdit: (user) => dispatch(openDialogToEdit(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);