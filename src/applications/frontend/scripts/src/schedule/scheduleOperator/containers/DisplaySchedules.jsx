import React from 'react';
import { connect } from 'react-redux';

import Schedules from '../components/Schedules';

import { startFetchSchedules } from '../../common/actions';

const mapStateToProps = (state) => ({
    daySettings: state.schedules.daySettings,
    schedules: state.schedules.schedules,
    workCategories: state.schedules.workCategories,
    availableSigns: state.schedules.availableSigns,
    scheduleOf: state.schedules.scheduleOf,
    isLoading: state.ui.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: (team, scheduleOf) => {
        dispatch(startFetchSchedules(team, scheduleOf));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedules);