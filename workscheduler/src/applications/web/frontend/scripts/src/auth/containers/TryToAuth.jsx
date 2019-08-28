import React from 'react';
import { connect } from 'react-redux';

import { startTryAuth } from "../actions/api";
import { changeLogInId, changePassword } from "../actions/page";

import Auth from "../components/Auth";

const mapStateToProps = (state) => ({
    logInId: state.auth.logInId,
    password: state.auth.password
});

const mapDispatchToProps = (dispatch) => ({
    changeLogInId: (e) => dispatch(changeLogInId(e.target.value)),
    changePassword: (e) => dispatch(changePassword(e.target.value)),
    tryToAuth: (logInId, password) => dispatch(startTryAuth(logInId, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);