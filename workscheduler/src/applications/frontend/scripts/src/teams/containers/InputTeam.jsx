import React from 'react';
import { connect } from 'react-redux';

import * as pageActions from '../actions/page';

import TeamForm from '../components/TeamForm';

const mapStateToProps = (state) => ({
    team: state.teamDialog
});

const mapDispatchToProps = (dispatch) => ({
    changeName: (e) => dispatch(pageActions.changeName(e.target.value)),
    changeNote: (e) => dispatch(pageActions.changeNote(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamForm);