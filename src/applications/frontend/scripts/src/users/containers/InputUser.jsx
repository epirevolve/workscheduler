import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import UserForm from '../components/UserForm';

const mapStateToProps = (state) => ({
    user: state.userDialog,
});

const mapDispatchToProps = (dispatch) => ({
    changeLoginId: (e) => dispatch(actions.changeLoginId(e.target.value)),
    changeName: (e) => dispatch(actions.changeName(e.target.value)),
    changeTeam: (e) => dispatch(actions.changeTeam(e.target.value)),
    changeIsAdmin: (e) => dispatch(actions.changeIsAdmin(e.target.checked)),
    changeIsOperator: (e) => dispatch(actions.changeIsOperator(e.target.checked)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);