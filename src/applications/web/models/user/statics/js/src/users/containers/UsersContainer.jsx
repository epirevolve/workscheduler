import React from 'react';
import { connect } from 'react-redux';

import Users from '../components/Users';

import { openDialogToAppend, openDialogToEdit } from '../actions';

const mapStateToProps = (state) => ({
    users: state.users
});

const mapDispatchToProps = (dispatch) => ({
    append: () => dispatch(openDialogToAppend()),
    edit: (user) => dispatch(openDialogToEdit(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);