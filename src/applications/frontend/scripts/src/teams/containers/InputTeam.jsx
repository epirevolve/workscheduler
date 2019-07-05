import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import TeamForm from '../components/TeamForm';

const mapStateToProps = (state) => ({
    team: state.teamDialog
});

const mapDispatchToProps = (dispatch) => ({
    changeName: (e) => dispatch(actions.changeName(e.target.value)),
    changeNote: (e) => dispatch(actions.changeNote(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamForm);