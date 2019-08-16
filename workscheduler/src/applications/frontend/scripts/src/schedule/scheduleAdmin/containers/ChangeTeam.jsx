import React from 'react';
import { connect } from 'react-redux';

import { startFetchSchedules } from '../../common/actions';
import { changeTeam } from '../actions';

import Teams from '../components/Teams';

const mapStateToProps = (state) => ({
    team: state.teams.team,
    scheduleOf: state.schedules.scheduleOf
});

const mapDispatchToProps = (dispatch) => ({
    changeTeam: (scheduleOf, e) => {
        const team = e.target.value;
        dispatch(startFetchSchedules(team, scheduleOf));
        dispatch(changeTeam(team));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Teams);