import React from 'react';
import { connect } from 'react-redux';

import { requestSchedules } from '../../common/actions';
import { changeTeam } from '../actions';

import Teams from '../components/Teams';

const mapStateToProps = (state) => ({
    team: state.teams.team,
    scheduleOf: state.schedules.scheduleOf
});

const mapDispatchToProps = (dispatch) => ({
    onTeamChange: (scheduleOf, e) => {
        const team = e.target.value;
        dispatch(requestSchedules(team, scheduleOf));
        dispatch(changeTeam(team));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Teams);