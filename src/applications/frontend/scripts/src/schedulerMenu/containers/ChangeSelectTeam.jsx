import React from 'react';
import { connect } from 'react-redux';

import Teams from '../components/Teams';

import { changeTeam } from '../actions';

const mapStateToProps = (state) => ({
    team: state.menu.team
});

const mapDispatchToProps = (dispatch) => ({
    changeTeam: (e) => { dispatch(changeTeam(e.target.value)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Teams);