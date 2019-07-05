import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import UserForm from '../components/UserForm';

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    changePassword: (e) => dispatch(actions.changePassword(e.target.value)),
    changeName: (e) => dispatch(actions.changeName(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);