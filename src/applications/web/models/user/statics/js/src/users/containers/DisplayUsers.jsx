import React from 'react';
import { connect } from 'react-redux';

import UserList from '../components/UserList';

import { openDialogToAppend, openDialogToUpdate } from '../actions';

const mapStateToProps = (state) => ({
    users: state.users
});

const mapDispatchToProps = (dispatch) => ({
    append: () => dispatch(openDialogToAppend()),
    edit: (user) => dispatch(openDialogToUpdate(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);