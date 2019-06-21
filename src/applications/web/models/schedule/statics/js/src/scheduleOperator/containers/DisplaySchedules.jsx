import React from 'react';
import { connect } from 'react-redux';

import Schedules from '../components/Schedules';

import { requestSchedules } from '../../common/actions';

const mapStateToProps = (state) => ({
    daySettings: state.schedules.daySettings,
    schedules: state.schedules.schedules,
    scheduleOf: state.schedules.scheduleOf,
    isLoading: state.ui.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: (team, scheduleOf) => {
        dispatch(requestSchedules(team, scheduleOf));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedules);