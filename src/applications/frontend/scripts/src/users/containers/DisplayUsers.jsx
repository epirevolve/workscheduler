import React from 'react';
import { connect } from 'react-redux';

import UserList from '../components/UserList';

import * as actions from '../actions';

const mapStateToProps = (state) => ({
    users: state.users
});

const mapDispatchToProps = (dispatch) => ({
    append: async () => dispatch(await actions.openDialogToAppend()),
    edit: (user) => dispatch(actions.openDialogToUpdate(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);