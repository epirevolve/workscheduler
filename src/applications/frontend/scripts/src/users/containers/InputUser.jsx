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
    changeRole: (e) => dispatch(actions.changeRole(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);